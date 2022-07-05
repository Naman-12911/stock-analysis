import moment from 'moment';

export interface Compound {
  principal: number;
  monthlyContribution: number;
  interestRate: number;
}

export interface CompoundPerTime extends Compound {
  time: number
}

export interface YearlyCompounds extends Compound {
  years: number;
}

export interface YearCompounded {
}

export const calculate_compound_per_time = ({ principal, monthlyContribution, interestRate, time }: CompoundPerTime): number => {
  let P = principal;              // principal or initial value
  let PMT = monthlyContribution;  // monthly contribution
  let r = interestRate            // annual interest rate
  let n = 12                      // number of times the interest is compounded per year #magic_number
  let t = time                    // the number of years

  const principalCompounded: number = P * Math.pow((1 + r / n), (t * n));
  const monthlyContributionsCompounded: number = PMT * (((Math.pow((1 + r / n), t * n)) - 1) / (r / n))

  let total: number = (principalCompounded + monthlyContributionsCompounded);

  return parseFloat(total.toFixed(2))
}

export const yearly_compounds = ({ years, principal, monthlyContribution, interestRate }: YearlyCompounds): YearCompounded[] => {
  let year: number;
  let yearCompounds: YearCompounded[] = [];

  for (year = 1; year <= years; year++) {
    const compoundPerTime: CompoundPerTime = {
      principal,
      monthlyContribution,
      interestRate,
      time: year
    }

    yearCompounds.push(calculate_compound_per_time(compoundPerTime));
  }

  return yearCompounds;
}

export const get_years = (amountYears: number) => {
  let year = parseInt(moment().format('YYYY'));
  let years: string[] = [];
  let i;

  for (i = 1; i <= amountYears; i++) {
    years.push((year + i).toString())
  }

  return years;
}
export {}