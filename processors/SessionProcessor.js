/* eslint-env node */
'use strict';

const PaperProcessor = require('../lib/PaperProcessor.js'),
  WORKSHOP_INDICATOR = 'MCI-WS',
  DEMO_INDICATOR = 'UP-PD',
  UPA_INDICTOR = 'UP',
  MCI_INDICATOR = 'MCI';

class SessionProcessor extends PaperProcessor {

  process(paper) {
    var sessionShortTitle = paper.session.shortTitle;
    if (sessionShortTitle !== '') {
      paper.session.isWorkshop = false;
      paper.session.isDemo = false;
      paper.session.isUPATrack = false;
      paper.session.isMCITrack = false;
      if (sessionShortTitle.startsWith(WORKSHOP_INDICATOR)) {
        paper.session.isWorkshop = true;
        paper.session.workshopId = parseInt(sessionShortTitle.replace('MCI-WS', ''), 10);
        return paper;
      }
      if (sessionShortTitle.startsWith(DEMO_INDICATOR)) {
        paper.session.isDemo = true;
        return paper;
      }
      if (sessionShortTitle.startsWith(UPA_INDICTOR)) {
        paper.session.isUPATrack = true;
        return paper;
      }
      if (sessionShortTitle.startsWith(MCI_INDICATOR)) {
        paper.session.isMCITrack = true;
        return paper;
      }
    }
    return paper;
  }
}

module.exports = SessionProcessor;