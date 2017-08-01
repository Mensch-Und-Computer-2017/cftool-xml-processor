/* eslint-env node */
'use strict';

const PaperProcessor = require('../lib/PaperProcessor.js'),
  MAX_PAPER_ID_LENGHT = 4,
  MAX_WORKSHOP_ID_LENGHT = 2,
  DOI_TEMPLATE = 'doi:10.18420/muc2017-{{KEY}}-{{PAPER_ID}}',
  DOI_UPA_KEY = 'up',
  DOI_MUC_KEY = 'mci',
  DOI_WS_KEY = 'ws',
  DOI_DEMO_KEY = 'demo';

class DOIProcessor extends PaperProcessor {

  process(paper) {
    let doi,
      paperId = paper.id.toString();
    for(let i = paperId.length; i < MAX_PAPER_ID_LENGHT; i++) {
      paperId = '0' + paperId;
    }
    if (paper.isUPAFullPaper || paper.isUPAShortPaper || paper.isUPAWorkshop || paper.isUPATutorial || paper.isUPAYoungProfessionals || paper.isUPAUsabilityChallenge) {
      doi = DOI_TEMPLATE.replace('{{KEY}}', DOI_UPA_KEY).replace('{{PAPER_ID}}', paperId);
    }
    if (paper.isMCIFullpaper || paper.isMCIShortPaper) {
      doi = DOI_TEMPLATE.replace('{{KEY}}', DOI_MUC_KEY).replace('{{PAPER_ID}}', paperId);
    }
    if (paper.isMCIDemo) {
      doi = DOI_TEMPLATE.replace('{{KEY}}', DOI_DEMO_KEY).replace('{{PAPER_ID}}', paperId);
    }
    if (paper.isMCIWorkshop) {
      let workshopId = paper.session.workshopId.toString();
      for (let i = workshopId.length; i < MAX_WORKSHOP_ID_LENGHT; i++) {
        workshopId = '0' + workshopId;
      }
      doi = DOI_TEMPLATE.replace('{{KEY}}', DOI_WS_KEY + workshopId).replace('{{PAPER_ID}}', paperId);
    }
    paper.doi = doi;
    paper.addPropertyToExport('doi');
    return paper;
  }

}

module.exports = DOIProcessor;