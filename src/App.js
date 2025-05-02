import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Page Components
import HomePage from './components/HomePage';
import About from './components/About';
import CancellationRefunds from './components/CancellationAndRefunds';
import ConferenceThemes from './components/ConferenceThemes';
import Programme from './components/Programme';
import ConferenceRegistration from './components/ConferenceRegistration';
import ConferenceProceedings from './components/ConferenceProceedings';
import DistinguishedSpeaker from './components/DistinguishedSpeaker';
import Committee from './components/Committee';
import Venue from './components/Venue';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Announcements from './components/Announcements';
import ConferenceSchedule from './components/ConferenceSchedule';
import MediaPartner from './components/Mediapartner';
import Accomodation from './components/Accomodation';
import Tours from './components/Tours';
import Travel from './components/Travel';
import TermsAndConditions from './components/TermsAndConditions';
import Language from './components/Language';
import Bengaluru from './components/Bengaluru';
import Weather from './components/Weather';
import TravelChecklist from './components/TravelChecklist';
import InternationalTravel from './components/InternationalTravel';
import Transport from './components/Transport';
import Local from './components/Local';
import MemberAccess from './components/MemberAccess';
import Electricity from './components/Electricity';
import ReachIisc from './components/ReachIisc';
import AbstractSubmission from './components/AbstractSubmission';
import NewUserRegistration from './components/NewUserRegistration';
import SubmitAbstractForm from './components/AbstractSubmissionButton';
import ForgotPassword from './components/ForgotPassword';
import AbstractSubmissionStatus from './components/AbstractSubmissionStatus';
import ChairmanMessage from './components/ChairmanMessage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import SponsorshipOpportunities from './components/SponsorshipOpportunities';
import PrivacyPolicy from './components/PrivacyPolicy';
import PaymentSuccess from './components/PaymentSuccess';
import AllPayments from './components/AllPayments';
import RegistrationForm from './components/RegistrationForm';
import BankPaymentTransaction from './components/BankPaymentLink';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/conference-themes" element={<ConferenceThemes />} />
      <Route path="/programme" element={<Programme />} />
      <Route path="/conference-registration" element={<ConferenceRegistration />} />
      <Route path="/conference-proceedings" element={<ConferenceProceedings />} />
      <Route path="/distinguished-speaker" element={<DistinguishedSpeaker />} />
      <Route path="/committee" element={<Committee />} />
      <Route path="/venue" element={<Venue />} />
      <Route path="/sponsors" element={<Sponsors />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/conference-schedule" element={<ConferenceSchedule />} />
      <Route path="/mediapartners" element={<MediaPartner />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
      <Route path="/accomodation" element={<Accomodation />} />
      <Route path="/tours-and-social-events" element={<Tours />} />
      <Route path="/travel-information" element={<Travel />} />
      <Route path='/privacy' element={<PrivacyPolicy/>}  />
      <Route path="/official-language" element={<Language />} />
      <Route path="/about-bengaluru" element={<Bengaluru />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/travel-checklist" element={<TravelChecklist />} />
      <Route path="/international-travel" element={<InternationalTravel />} />
      <Route path="/transport" element={<Transport />} />
      <Route path="/local-bengaluru" element={<Local />} />
      <Route path='/payment-success' element={<PaymentSuccess />} />
      <Route path="/electricity" element={<Electricity />} />
      <Route path="/reach-iisc" element={<ReachIisc />} />
      <Route path="/login-signup" element={<MemberAccess />} />
      <Route path="/abstract-submission" element={<AbstractSubmission />} />
      <Route path='/cancellation-and-refunds' element={<CancellationRefunds />} />
      <Route path="/register" element={<NewUserRegistration />} />
      <Route path="/submit-abstract" element={<SubmitAbstractForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/abstract-submission-status" element={<AbstractSubmissionStatus />} />
      <Route path="/message-to-chairman" element={<ChairmanMessage />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/sponsorship-opportunities" element={<SponsorshipOpportunities />} />
      <Route path='/payment-receipts' element={<AllPayments />} />
      <Route path='/registration-form' element={<RegistrationForm />} />
      <Route path='/bank-payment-upload' element={<BankPaymentTransaction />} />
    </>
  ),
  {
    basename: '/stis2025/',
  }
);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
