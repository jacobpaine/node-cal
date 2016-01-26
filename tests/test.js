'use strict';

const { expect } = require('chai');
const { execSync } = require('child_process');

describe('cal', () => {
  it('should handle the current month', () => {
    const goal = execSync('cal').toString();
    const output = execSync('./cal.js').toString();

       expect(output).to.be.equal(goal);
  });
});
