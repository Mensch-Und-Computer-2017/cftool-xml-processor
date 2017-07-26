/* eslint-env node */
'use strict';

class PaperProcessor {
  constructor(id) {
    this.id = id;
  }

  process(paper) {
    return paper;
  }
}

module.exports = PaperProcessor;