/*
//named import
import {add,diff,number} from './export_module.mjs'

console.log(add(10,20));
console.log(diff(10,20));
//default import
import multi from './export_module.mjs'
console.log(multi(10,20));
*/
//all import
import * as math from './export_module.mjs'
console.log(math.add(10,20));
console.log(math.diff(20,10));