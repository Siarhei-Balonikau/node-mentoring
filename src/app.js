import DirWatcher from './modules/dirwatcher';
import Importer from './modules/importer';

const path = './data/';

const dirWatcher = new DirWatcher();
dirWatcher.watch('./data/', 2000);
const dwEventEmitter = dirWatcher.getEventEmitter();

const importer = new Importer();
/* async */
importer.listen(dwEventEmitter, './data/');
/* sync */
//importer.listen(dwEventEmitter, './data/', true);
