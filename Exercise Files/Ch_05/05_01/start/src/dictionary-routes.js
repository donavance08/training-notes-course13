import { Router } from 'express';
import skiDataJSON from '../data/skiTerms.json';
let skiTerms = skiDataJSON;
import { save } from './lib';

const router = new Router();
router.get('/', (req, res) => {
  res.json(skiTerms);
});

router.post('/', (req, res) => {
  skiTerms.push(req.body);
  save();
  res.json({
    status: 'success',
    term: req.body,
  });
});

router.delete('/:term', (req, res) => {
  skiTerms = skiTerms.filter((def) => def.term !== req.params.term);
  save();
  res.json({
    status: 'success',
    removed: req.params.term,
    newLength: skiTerms.length,
  });
});

export default router;
