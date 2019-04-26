
const Z80JS = require("z80js");
var fs = require('fs');

var binary = fs.readFileSync('../test/bin/main.bin', 'hex');

let program = binary.match(/.{2}/g);

program = program.map(byte => parseInt(`0x${byte}`));
console.log(program)

const memortStart = 0;
const memory = {};

let memoryPos = memortStart;
program.forEach(byte => {
  memory[memoryPos] = byte;
  memoryPos = memoryPos + 1;
});




const z80 = Z80JS({
  mem_read: (address) => {
    // console.log("READ", address.toString(16));
    return memory[address] || 0x00;
  },
  mem_write: (address, data) => {
    // console.log("WRITE", address, data);
  },
  io_read: () => {},
  io_write: () => {}
});

// Safety to stop program counter running away. For big applications, this may need to be increased.
while(z80.getState().pc < 10000) {
  console.log(z80.getState().a);
  z80.run_instruction();
  // console.log('----');
}
