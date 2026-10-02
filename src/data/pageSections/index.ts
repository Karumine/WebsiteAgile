import type { PageSectionContent } from '@/types';
import { mergeAllSections, type PageSectionSchema } from '@/lib/pageSections';
import { aboutSections } from './about';
import { biogasProductionSections } from './biogasProduction';
import { calculatorSections } from './calculator';
import { chillerSections } from './chiller';
import { contactSections } from './contact';
import { cookiePolicySections } from './cookiePolicy';
import { drinkingWaterSections } from './drinkingWater';
import { faqPageSections } from './faqPage';
import { foodProcessingSections } from './foodProcessing';
import { generatorSetSections } from './generatorSet';
import { homeWhatWeDoSections } from './homeWhatWeDo';
import { homeEligibilitySections } from './homeEligibility';
import { homeProjectsSections } from './homeProjects';
import { homePartnersSections } from './homePartners';
import { homeLatestNewsSections } from './homeLatestNews';
import { homeContactSections } from './homeContact';
import { injectionMoldingSections } from './injectionMolding';
import { interestRateSections } from './interestRate';
import { investorRelationsSections } from './investorRelations';
import { knowledgePageSections } from './knowledgePage';
import { leasingApplicationSections } from './leasingApplication';
import { livestockFarmSections } from './livestockFarm';
import { ncNdaSections } from './ncNda';
import { newsPageSections } from './newsPage';
import { newsletterPageSections } from './newsletterPage';
import { projectsSections } from './projects';
import { solarPowerSections } from './solarPower';
import { sustainabilitySections } from './sustainability';
import { usedMachineSections } from './usedMachine';
import { workForUsSections } from './workForUs';

/** Every page's editable sections — imported by the admin editor only. */
export const PAGE_SECTION_SCHEMAS: Record<string, PageSectionSchema[]> = {
    about: aboutSections,
    'biogas-production': biogasProductionSections,
    calculator: calculatorSections,
    chiller: chillerSections,
    contact: contactSections,
    'cookie-policy': cookiePolicySections,
    'drinking-water': drinkingWaterSections,
    faq: faqPageSections,
    'food-processing': foodProcessingSections,
    'generator-set': generatorSetSections,
    home: [...homeWhatWeDoSections, ...homeEligibilitySections, ...homeProjectsSections, ...homePartnersSections, ...homeLatestNewsSections, ...homeContactSections],
    'injection-molding': injectionMoldingSections,
    'interest-rate': interestRateSections,
    'investor-relations': investorRelationsSections,
    knowledge: knowledgePageSections,
    'leasing-application': leasingApplicationSections,
    'livestock-farm': livestockFarmSections,
    'nc-nda': ncNdaSections,
    news: newsPageSections,
    newsletter: newsletterPageSections,
    projects: projectsSections,
    'solar-power': solarPowerSections,
    sustainability: sustainabilitySections,
    'used-machine': usedMachineSections,
    'work-for-us': workForUsSections,
};

export const getPageSchemas = (pageId: string): PageSectionSchema[] => PAGE_SECTION_SCHEMAS[pageId] || [];

export const mergePageSections = (pageId: string, saved?: Record<string, PageSectionContent>) =>
    mergeAllSections(getPageSchemas(pageId), saved);
