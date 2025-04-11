import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the omni_engineer_extension extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'omni_engineer_extension:plugin',
  description: 'Extending JupyterLab to incorporate Omni Engineer',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension omni_engineer_extension is activated!');
  }
};

export default plugin;
