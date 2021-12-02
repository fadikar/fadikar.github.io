// TODO Add a couple lines about each project
const data = [
  {
    title: 'Machine learning synthetic spectra for probabilistic redshift estimation: SYTH-Z ',
    subtitle: 'Photometric redshift estimation',
    link: 'https://arxiv.org/abs/2111.12118',
    image: '/images/projects/fig1c-1.png',
    date: '2021-11-23',
    desc:
      'Photometric redshift estimation algorithms are often based on representative data from observational campaigns. Data-driven methods of this type are subject to a number of potential deficiencies, such as sample bias and incompleteness. Motivated by these considerations, we propose using physically motivated synthetic spectral energy distributions in redshift estimation.',
  },
  {
    title: 'Scalable Statistical Inference of Photometric Redshift via Data Subsampling',
    subtitle: 'Photometric redshift estimation',
    link: 'https://arxiv.org/abs/2103.16041v2',
    image: '/images/projects/hyperrec_all_2d.png',
    date: '2021-03-30',
    desc:
      'We develop a data-driven statistical modeling framework that combines the uncertainties from an ensemble of statistical models learned on smaller subsets of data carefully chosen to account for imbalances in the input space. ',
  },
  {
    title: 'Forecasting influenza activity using machine-learned mobility map',
    subtitle: 'Flu forecasting',
    link: 'https://www.nature.com/articles/s41467-021-21018-5',
    image: '/images/projects/nature_amm.png',
    date: '2021-02-09',
    desc:
      'In this work, we focus on a machine-learned anonymized mobility map (AMM) aggregated over hundreds of millions of smartphones and evaluate its utility in forecasting epidemics. We factor AMM into a metapopulation model to retrospectively forecast influenza in the USA and Australia',
  },
  {
    title: 'Stochastic agent-based model calibration for Ebola',
    subtitle: 'Ebola challenge',
    link: 'https://epubs.siam.org/doi/abs/10.1137/17M1161233',
    image: '/images/projects/holdout.png',
    date: '2018-12-13',
    desc:
      'We develop a strategy to emulate and calibrate a stochastic agent-based model '
      + 'based on quantile kriging inside a Bayesian framework, where the agent-based model '
      + 'simulates an Ebola epidemic in West Africa.',
  },
  {
    title: 'Optimizing spatial allocation of seasonal influenza vaccine under temporal constraints',
    subtitle: 'Vaccination strategy',
    link: 'https://doi.org/10.1371/journal.pcbi.1007111',
    image: '/images/projects/plos_vaccine.png',
    date: '2019-09-16',
    desc:
      'Annual vaccination campaigns continue to be one of the prime measures which help alleviate the burden of seasonal influenza. Due to production and logistic constraints, there is a need for prioritization policies associated with vaccine deployment. While there is general consensus on age-based or risk-based prioritization, spatial optimization of vaccine allocation has not yet been explored in sufficient detail. In order to do this, we develop a mechanistic model of influenza spread across the United States, and propose a greedy mechanism for spatial optimization. We test the methodology on different realistic scenarios with temporal constraints on vaccine production.',
  },
  /* {
    title: 'Cat Detector',
    subtitle: 'A convolutional neural network to classify cats! (and dogs)',
    image: '/images/projects/catdetector.jpg',
    date: '2015-05-15',
    desc:
      'Trained a convolutional neural network to classify between ~ 80 cats breeds. '
      + 'Over 60,000 cats were classified before server bills made the project too expensive '
      + 'to continue hosting.',
  }, */
];

export default data;
