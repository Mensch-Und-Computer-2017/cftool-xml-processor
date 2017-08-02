/* eslint-env node */
'use strict';

const PaperProcessor = require('../lib/PaperProcessor.js'),
  MAX_PAPER_ID_LENGTH = 3,
  MAX_WORKSHOP_ID_LENGTH = 2,
  MCI_FULL_PAPER_PATH = 'Beta MCI Proc/04 Langbeitraege/2017_MCI_{{PAPER_ID}}.pdf',
  MCI_SHORT_PAPER_PATH = 'Beta MCI Proc/05 Kurzbeitraege/2017_MCI_{{PAPER_ID}}.pdf',
  MCI_WORKSHOP_PAPER_PATH = 'Beta WS Proc/04 Workshops/2017_WS{{WORKSHOP_ID}}/2017_WS{{WORKSHOP_ID}}_{{PAPER_ID}}.pdf',
  MCI_DEMO_PAPER_PATH = 'Beta WS Proc/05 Demos/2017_DEMO_{{PAPER_ID}}.pdf',
  UPA_PAPER_PATH = 'Beta UP Proc/05 Full Presentations/2017_UP_{{PAPER_ID}}.pdf',
  UPA_YOUNG_PROFESSIONALS_PAPER_PATH = 'Beta UP Proc/06 Young Professionals Presentation/2017_UP_{{PAPER_ID}}.pdf',
  UPA_WORKSHOP_PAPER_PATH = 'Beta UP Proc/07 Workshops/2017_UP_{{PAPER_ID}}.pdf';

class PathProcessor extends PaperProcessor {

  process(paper) {
    let path,
      id = paper.id.toString();
    for(let i = id.length; i < MAX_PAPER_ID_LENGTH; i++) {
      id = '0' + id;
    }
    if (paper.isMCIFullpaper) {
      path = MCI_FULL_PAPER_PATH.replace('{{PAPER_ID}}', id);
    }
    if (paper.isMCIShortpaper) {
      path = MCI_SHORT_PAPER_PATH.replace('{{PAPER_ID}}', id);
    }
    if (paper.isMCIWorkshop) {
      let workshopId = paper.session.workshopId.toString();
      for(let i = workshopId.length; i < MAX_WORKSHOP_ID_LENGTH; i++) {
        workshopId = '0' + workshopId;
      }
      path = MCI_WORKSHOP_PAPER_PATH.replace('{{PAPER_ID}}', id).split('{{WORKSHOP_ID}}').join(workshopId);
    }
    if (paper.isMCIDemo) {
      path = MCI_DEMO_PAPER_PATH.replace('{{PAPER_ID}}', id);
    }
    if (paper.isUPAFullPaper || paper.isUPAShortPaper) {
      path = UPA_PAPER_PATH.replace('{{PAPER_ID}}', id);
    }
    if (paper.isUPAYoungProfessionals) {
      path = UPA_YOUNG_PROFESSIONALS_PAPER_PATH.replace('{{PAPER_ID}}', id);
    }
    if (paper.isUPAWorkshop) {
      path = UPA_WORKSHOP_PAPER_PATH.replace('{{PAPER_ID}}', id);
    }
    paper.pathInProceedings = path;
    paper.addPropertyToExport('pathInProceedings');
    return paper;
  }

}

module.exports = PathProcessor;