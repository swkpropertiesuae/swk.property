import type { Community } from '@/data/communities';
import { REG } from '@/data/regulation';
import { emi, cashToClose } from './math';

/** Resident (80% @3.99%) and investor (60% @4.29%) EMI vs typical rent for a community. */
export function coverage(c: Community) {
  const price = c.typical * 1e6;
  const res = emi(price * REG.ltv.expat.first / 100, 3.99, 25), inv = emi(price * REG.ltv.expat.subsequent / 100, 4.29, 25);
  const rentMo = c.rent / 12;
  return { price, res, inv, rentMo, resCov: rentMo / res, invCov: rentMo / inv, cash: cashToClose({ price, downPct: 20 }).total };
}
