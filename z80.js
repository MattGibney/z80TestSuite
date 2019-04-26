const Z80JS = require("z80js");

class Z80Memory {
  constructor() {
    this.memoryObj = {
      '0': 0x00
    };
  }

  read(address) {
    return this.memoryObj[address] || 0x00;
  }

  write(address, data) {
    this.memoryObj[address] = data;
  }
}

const memory = new Z80Memory();


const z80 = Z80JS({
  mem_read: (address) => memory.read(address),
  mem_write: (address, data) => memory.write(address, data),
  io_read: () => {},
  io_write: () => {}
});

// Safety to stop program counter running away. For big applications, this may need to be increased.
// while(z80.getState().pc < 10000) {
//   // console.log(z80.getState().a);
//   z80.run_instruction();
//   // console.log('----');
// }

module.exports = { z80, memory };