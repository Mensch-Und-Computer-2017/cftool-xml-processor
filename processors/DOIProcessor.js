/* eslint-env node */
'use strict';

const PaperProcessor = require('../lib/PaperProcessor.js');

class DOIProcessor extends PaperProcessor {

  process(paper) {
    paper.doi = 42;
    paper.addPropertyToExport('doi');
    return paper;
  }

}

module.exports = DOIProcessor;