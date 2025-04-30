import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ILauncher } from '@jupyterlab/launcher';
import { Terminal } from '@jupyterlab/terminal';
import { ICommandPalette } from '@jupyterlab/apputils';
import { UUID } from '@lumino/coreutils';

const extension: JupyterFrontEndPlugin<void> = {
  id: 'omni-engineer-extension',
  autoStart: true,
  requires: [ILauncher, ICommandPalette],
  activate: (
    app: JupyterFrontEnd,
    launcher: ILauncher,
    palette: ICommandPalette
  ) => {
    const { commands } = app;

    const commandID = 'omni-engineer:launch';

    commands.addCommand(commandID, {
      label: 'Launch OmniEngineer',
      execute: async () => {
        const session = await app.serviceManager.terminals.startNew();
        const terminal = new Terminal(session, {
          initialCommand:
            'python /workspaces/omni-engineer-extension/omni_engineer_extension/omni-engineer/main.py\n',
          theme: 'inherit'
        });

        terminal.id = `omni-engineer-terminal-${UUID.uuid4()}`;

        terminal.title.label = 'OmniEngineer';
        terminal.title.closable = true;
        app.shell.add(terminal, 'main');
        app.shell.activateById(terminal.id);
      }
    });

    launcher.add({
      command: commandID,
      category: 'Other',
      rank: 1
    });

    palette.addItem({ command: commandID, category: 'OmniEngineer' });
  }
};

export default extension;
