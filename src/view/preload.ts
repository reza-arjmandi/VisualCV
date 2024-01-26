// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron/renderer';
import { CvProcess } from '../models';

contextBridge.exposeInMainWorld('backend', {
  getProcessesList: () => ipcRenderer.invoke('getProcessesList'),
  invokeCvProcess: (cvProces: CvProcess) => ipcRenderer.invoke('invokeCvProcess', cvProces),
})