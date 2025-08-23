const menuButton = document.getElementById('menuButton');
const mobileMenu = document.getElementById('mobileMenu');
const primaryMenu = document.getElementById('primaryMenu');

const handleToggleMenu = () => {
  if (!menuButton || !mobileMenu) return;
  const isOpen = !mobileMenu.classList.contains('hidden');
  if (isOpen) {
    mobileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    return;
  }
  mobileMenu.classList.remove('hidden');
  menuButton.setAttribute('aria-expanded', 'true');
};

const handleKeyToggle = (event) => {
  if (!event) return;
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  handleToggleMenu();
};

const handleCloseOnResize = () => {
  if (!mobileMenu) return;
  if (window.innerWidth >= 768) {
    mobileMenu.classList.add('hidden');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
  }
};

if (menuButton) {
  menuButton.addEventListener('click', handleToggleMenu);
  menuButton.addEventListener('keydown', handleKeyToggle);
}

document.querySelectorAll('#mobileMenu a').forEach((link) => {
  link.addEventListener('click', () => {
    if (!mobileMenu || !menuButton) return;
    mobileMenu.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('resize', handleCloseOnResize);

// Products & Systems filtering and UI enhancements
const filterInput = document.getElementById('products-filter-input');
const filterClear = document.getElementById('products-filter-clear');
const productRows = Array.from(document.querySelectorAll('.products-row'));
const tableWrapper = document.getElementById('productsTableWrapper');
const tableTopShadow = document.getElementById('productsTableTopShadow');

const handleFilter = () => {
  if (!filterInput) return;
  const query = filterInput.value.trim().toLowerCase();
  let visible = 0;
  productRows.forEach((row) => {
    const text = row.textContent ? row.textContent.toLowerCase() : '';
    const matches = text.includes(query);
    row.style.display = matches ? '' : 'none';
    if (matches) visible += 1;
  });
  if (filterClear) filterClear.classList.toggle('hidden', query.length === 0);
};

const handleClearFilter = () => {
  if (!filterInput) return;
  filterInput.value = '';
  handleFilter();
  filterInput.focus();
};

if (filterInput) {
  filterInput.addEventListener('input', handleFilter);
}
if (filterClear) {
  filterClear.addEventListener('click', handleClearFilter);
}

const handleTableScrollShadow = () => {
  if (!tableWrapper || !tableTopShadow) return;
  const scrolled = tableWrapper.scrollTop > 0;
  tableTopShadow.style.opacity = scrolled ? '1' : '0';
};

if (tableWrapper) {
  tableWrapper.addEventListener('scroll', handleTableScrollShadow);
}



// Brands Section Functionality
// Sample brand data for testing (you can replace these with your actual brands)
const brandsData = {
  'A': ['A&P Instruments (ULTRA X / ULTRAMAT)', 'ABB Automation', 'AAEON', 'AAVB', 'ABB Motor', 'ABACUS', 'ABB Stotz – Kontakt', 'ABB Transformatoren', 'ABB Transformers', 'ABCO', 'ABP Induction', 'ABP-Antriebstechnik', 'ABUS Kransysteme', 'ACA Systems', 'ACD Elektronik', 'ACE / ACE Controls', 'Achenbach', 'ACME / Acme Electric Transformers (brand of Hubbell)', 'AC-Motoren', 'ACROMAG', 'ACS Control System', 'ACS Motion Control', 'ACT ELECTRIC (Japan)', 'Adalet (brand of Scott Fetzer)', 'ADEL System', 'Adels Contact', 'ADEV SRL', 'Advanced motion controls', 'Advantech', 'ADVEL', 'AE Advanced Energy', 'AECO AEG Niederspannung', 'AED Atomation', 'AEP transducers', 'Aeroflex', 'AERO-LIFT', 'AESSEAL', 'Aetna Group', 'Afriso', 'AFS (Plasma-Corona-Perforators)', 'AFS Airfilter Systeme', 'Agie Charmilles', 'AGRICHEMA', 'Agro Forst & Energietechnik', 'Ahlborn (ALMEMO)', 'AHP Merkle', 'Ahresty', 'AICHELIN', 'Aignep', 'Air Logic (Division of Knapp Manufacturing, Inc)', 'Air Torque', 'AirCom Pneumatic', 'AIRcomp', 'AIRMAR', 'Airon Pneumatic', 'Airpol', 'Airtac', 'AIRTEC MUEKU', 'AIRTEC Pneumatic', 'AIRTECH Compressors', 'Airtek', 'Airwork', 'AJ Technology, s.r.o.', 'AKO Armaturen', 'Alco Valves', 'Alcon', 'ALDAK', 'Alentec & Orion', 'Alfa Laval', 'ALFATEC Fördersysteme', 'Alfred Durst Filtertechnik', 'Alfred Gruber', 'Alfred Jager', 'AL-KO', 'Allen Bradley', 'Allen-Bradley', 'ALLFETT', 'ALLIED VISION TECHNOLOGIES', 'Alloy Wire', 'Alltech Dosieranlagen', 'Alluris', 'ALLWEILER', 'Alpatek', 'Alpha Technologies (an EnerSys company)', 'ALRE', 'ALRE-IT', 'Alrose Gas Springs', 'Alstom', 'ALTAIR', 'Altech Corporation', 'ALTO', 'ALTOF', 'Alutronic', 'ALWAYSE Engineering', 'Alwitco', 'ALXION', 'Amandus Kahl', 'AMARC (brand of Zoppas Industries)', 'AMD', 'Ametek', 'AMF', 'AMISCO Spa', 'AMKCO', 'Amp', 'Ampco Pumps', 'Amphenol', 'Amphenol', 'AMS Technologies', 'Amtecs', 'ANDERSON-NEGELE', 'Andreas Hettich', 'Andritz Ritz', 'Animatics (brand of Moog)', 'Anlagenbau Bohmer', 'Anritsu', 'ANSON HYDRAULICS', 'Anyseals', 'AOYUE', 'AP Sol Aquasignal', 'APATOR METRA', 'APC', 'API Pneumatic s.r.l.', 'Apollo Valves', 'Applied Weighing (Target)', 'Apra Norm', 'APT', 'APT (Automation & Produktionstechnik)', 'AQMOS', 'Aquafine', 'Aquametro Oil & Marine', 'AQUATRACE / AQUATROX / ZIROX / OXYMASTER / OxyTrans (brand of DKS Engineering)', 'AR FILTRAZIONI', 'Aranci (Are S.r.l.)', 'ARBO Systems', 'ARCA Regler', 'Arcol', 'ARCUSAFLEX (brand of Reich Kupplungen)', 'ARDETEM SFERE', 'Ares Elettronica', 'ARGO-HYTOS', 'ARGUS Fluidtechnik', 'ARICON', 'ARIS Antriebe und Steuerungen', 'Aristo', 'Armagard', 'Armatec', 'ARMATUREN-ARNDT', 'Armstrong', 'Arnold Automation', 'ARON (brand of Brevini)', 'Aros', 'ARROW', 'Artesyn / Astec', 'Artesyn Technologie', 'A-RYUNG MACHINERY', 'AS Aston Seals', 'Ascell', 'ASCO Ascon Spa', 'ASCO Joucomatic / Numatics (Brand of Emerson)', 'ASCO JOUCOMATIC NUMATICS', 'Ascon Tecnologic', 'Ashcroft', 'ASM', 'ASO Safety Solutions', 'AST Angewandte System Technik / A.S.T.', 'ASTRO-Pneumatic', 'ATAS elektromotory', 'ATB Laurence Scott (Brand of ATB Group)', 'ATB Nordenham (Brand of ATB Group UK)', 'Atek Sensor', 'ATI Industrial Automation', 'Atlantic Ultraviolet Corporation', 'Atmos', 'ATR Industrie-Elektronik (brand of Siempelkamp Group)', 'AUER SIGNAL', 'Auer Strahltechnik', 'August Friedberg', 'Aumüller / Aumueller (ferralux®)', 'AUTEC Srl', 'Autel', 'Automation Direct', 'Automax (brand of FLOWSERVE)', 'Autotech Controls / AVG', 'Autronica', 'AVA Maschinen', 'AVAG PUMPEN', 'Aventics (brand of Emerson)', 'Avery Dennison', 'AVITEQ', 'AVK', 'AVS Romer / Roemer', 'AW Lake', 'AXAIR', 'Axicon', 'Axima', 'AXIS', 'AZ Pneumatic', 'azbil Yamatake', 'AZO'],
  'B': ['B&R', 'BEG', 'BALLUFF', 'Baldor', 'Belden', 'Batron Baumer', 'BELIMO Aircontrols', 'Bender', 'BEKO', 'Bently Nevada', 'Binder', 'Bopla BOSCH', 'Brad Harrison', 'Buschjost', 'Bourns', 'Bürkert', 'Bussmann Inc.', 'B & Plus KK', 'B&C Electronics', 'B+L Industrial Measurements', 'B-COMMAND', 'Bachofen Automation', 'Backer', 'Badestnost', 'Badger Meter', 'Baelz', 'BAG electronics (brand of OSRAM)', 'Bailey&Mackey', 'bAKA Handling Solutions', 'Balance Systems', 'Baldor / Reliance Baldor (Brand of ABB)', 'Balke Pumpen', 'BALLUFF', 'Balossi', 'BalTec Maschinenbau AG', 'Balti', 'Bansbach', 'Baratti', 'BARBERO Pumps', 'Barcontrol', 'Bardiani Valvole', 'Barksdale', 'Baruffaldi', 'BASS - antriebstechnik', 'Bass Instruments', 'Bauckhage', 'BAUER KOMPRESSOREN Ersatzteile', 'Baumann Packaging Systems', 'Baumer', 'Baumer Hübner', 'Baumgartner Pneumatik', 'Becker', 'BECO', 'BEDIA', 'BEE', 'Bei Sensors (brand of Sensata Technologies)', 'Beinlich Pumpen', 'BEKO TECHNOLOGIES / BEKOMAT', 'BEL-RAY', 'Bellegrandi', 'BELLODI', 'BELLOI & ROMAGNOLI', 'Belting', 'Beluk', 'BEMERS & Co', 'Benz-tools', 'Benzi & di Terlizzi (REDUCO gearboxes / Evolution / Energy)', 'Benzlers', 'Berarma', 'Berges electronic', 'Berghof Automationstechnik', 'Bergproduct', 'Berluto Armaturen', 'BERNARD CONTROLS', 'Berner', 'BERNIO', 'Bernstein', 'Bertolaso', 'Bertoli Homogenizers', 'Bertoncello', 'BESA Valves', 'Besel (brand of Cantoni Group)', 'Besozzi Elettromeccanica', 'BESSEY TOOLS', 'BETA Pressure & Temperature Switches', 'beta SENSORIK', 'bevi', 'BGK', 'Bi-mec Trasformatori', 'BIAX', 'Bieler+Lang', 'Bielomatik', 'Bierther Submikron', 'BIFFI (Brand of Emerson)', 'BIFOLD FLUIDPOWER (brand of Rotork)', 'BIG DAISHOWA SEIKI', 'Bihl Wiedemann', 'Bilz Vibration Technology', 'BIMBA (brand of IMI Precision Engineering)', 'Bimed', 'Binder (Franz Binder Automation technology / Connectors)', 'BINDER Group (COMBIMASS / CAMASS / VACOMASS)', 'BinMaster (brand of Garner Industries)', 'Bircher Reglomat', 'BIW', 'Bizerba', 'BLACKS CHARPY', 'Blemo', 'Blickle', 'Blitz (brand of DOVER)', 'BLOCK Transformatoren', 'BLOKSMA Engineering', 'Bluhm Systeme', 'BOBE Industrie-Elektronik', 'Bockwoldt', 'BODINE ELECTRIC', 'BOE-THERM', 'BOGE', 'BOHLE', 'Bonani', 'BONETTI Armaturen / Cesare BONETTI', 'BONFANTI', 'Boscarol', 'Bosch Racine', 'Bosch Rexroth', 'Boschert', 'Boschert Safety Chucks', 'BOSSARD', 'BOSTAK', 'Boston Gear (Brand of Altra Industrial Motion)', 'Botter Elettrotecnica', 'Bourns', 'BR-Automation', 'Bracke', 'Brady', 'Braglia', 'BRAHMA', 'Brano', 'BRAUN', 'Brecoflex', 'BREMAS ERSCE', 'Bretzel', 'Brevetti Stendalto', 'Brevini (brand of DANA Group)', 'Briem', 'Brilex', 'BRINKMANN', 'Brodersen', 'Brollo', 'Bronkhorst', 'Bronzoni', 'Brook Crompton', 'Brooks Instrument', 'Broquet', 'BROVIND VIBRATORI / BROVIND ELETTRONICA', 'BROYCE CONTROL', 'Bruel & Kjær Vibro', 'Brüel & Kjaer (brand of HBK company)', 'Brueninghaus (brand of Bosch Rexroth)', 'BST eltromat', 'BTA Thermo', 'BTSR', 'Bucher Hydraulics', 'BUEHLER / MET / ITW (part of Illinois Tool Works (ITW))', 'Buhler Technologies', 'Burster Präzisionsmesstechnik', 'Busch Pumpen', 'Burckhardt Compression', 'BÜTTNER / BUTTNER (brand of Siempelkamp Group)', 'BV-TECH', 'BVM BRUNNER', 'BWF (BW-Fixatoren)', 'BWO Elektronik', 'By Carpel'],
  'C': ['Camille Bauer', 'CEAG', 'CAL Controls', 'Carlo Gavazzi', 'Chromolox', 'CCC', 'C – MAC', 'C-FILTER FILTRY', 'C. P. Bourg', 'cab Technology', 'Cabur', 'CAFFINI CIPRIANO S.R.L.', 'Cama Group', 'CAMLogic', 'Camozzi', 'CAMPAK / CAM Packaging Machines', 'CAMTEC', 'Cantalupi', 'Cantoni Motor', 'Capitanio Airpumps', 'Caproni Pump', 'Captron', 'Carl Rehfuss', 'Carlyle Compressor (brand of United Technologies Corporation)', 'Carpanelli', 'CARPANO EQUIPMENT', 'Carsoe', 'Cashco Tank Equipment (formerly Valve Concepts)', 'Castel Valves', 'CAT', 'CAT PUMPS', 'CBF HYDRAULIC', 'CBF Motors', 'CCS Inc. (Custom Control Sensors, LLC) (Brand of OPTEX GROUP)', 'CD AUTOMATION', 'CDC Elettromeccanica Italy', 'CEA Elettronica', 'CEAG (Brand of Eaton)', 'Ceccato Compressors', 'CEDS DURADRIVE', 'Cela Industry Srl', 'Celduc', 'Celsa Messgeräte', 'CELTIC S.A.R.L.', 'CEMA', 'CEMB', 'Ceme S.p.A.', 'CEMP', 'Centec (Labor- und Prozessmesstechnik)', 'Centrix Aerospace Engineering', 'CERA SYSTEM (Cera Valve / Cera Pipe / Cera Flex)', 'CERTUSS Dampfautomaten', 'Chalmit (brand of Hubbell)', 'CHAYSOL', 'Cheburatoric', 'Cheburatoric-2', 'Check-All Valve', 'ChemValve-Schmid', 'CHIARAVALLI', 'Chicago Blower', 'ChipBLASTER / ChipCHILLER / MistBLASTER / SkimBLASTER / CbCYCLONE', 'CIE Centro Italiano di Ergonomia', 'CIMBRIA', 'CIMM', 'CINCINNATI MACHINES', 'CIOCCA', 'Cisa Cedaceria', 'Cleveland Cascades', 'Cleveland Tramrail (brand of Gorbel)', 'Climet Instruments', 'Clippard Minimatic', 'Clorius Controls', 'CLYDE BERGEMANN', 'cmc Instruments', 'CMC Texpan (brand of Siempelkamp Group)', 'CML (Camel Precision)', 'Coax', 'Cognex', 'COHLINE', 'Coiltech', 'Cole-Parmer', 'Collamat', 'Collin Technology', 'Collins Swirlklean', 'COLMANT CUVELIER', 'Comat Releco', 'Comau', 'COMER INDUSTRIES', 'CominTec', 'COMITRONIC-BTI', 'Compomac', 'Componex (brand of Maxcess)', 'Concomatic', 'Conductix-Wampfler', 'CONTA-CLIP', 'Contarini', 'Continental Ultra Pumps', 'Contrinex', 'Control Techniques (brand of NIDEC)', 'Convum (brand of Parker)', 'Coperion / K-Tron', 'Copersa', 'Copley Controls', 'Coremo Ocmea', 'CORREGE', 'Costruzioni Elettrotecniche CEAR s.r.l.', 'CPS Products', 'Crane', 'CREI Heaters', 'CREI STT Elettronica', 'CRESSTO', 'CROSBY Valves (brand of Emerson)', 'CROSS+MORSE', 'Crouzet', 'CRYDOM (brand of Sensata Technologies)', 'CryoVac low temperature technology', 'CSF Inox Pumps', 'CTS / Schreiner / Cincinnati Test Systems – Schreiner GmbH (Brand of TASI Group)', 'CV Hydraulik', 'Cynergy3', 'CT – Concept', 'CCS Dual – Snap', 'Cewe Instrument', 'Chauvin Arnoux', 'City Technology', 'Clif Mock', 'Comm Con Connectors', 'Compare', 'CompAir', 'Contrinex', 'Curtis Instrument', 'Cutler Hammer', 'Crouzet', 'Continental'],
  'D': ['Danfoss Industrieautomatik', 'Delta M Corporation', 'Danfoss Motion Controls', 'Data Sensor', 'Demag', 'Data Vision', 'Detector Electronics Corporation', 'Dinkle Dold', 'Dräger Safety', 'Druck Dungs', 'Dymec', 'D+P Technik (Dosier- und Prüftechnik)', 'D.K. Moriarty', 'D/A Manufacturing (D-A)', 'DAIICHI ELECTRONICS', 'DAMATOMACCHINE', 'DAMKO Ventiltechnik', 'Danieli', 'DANOBAT', 'Danotherm', 'Daqtix', 'Darmet', 'Datalogic', 'Datapaq (brand of Fluke Process Instruments)', 'DATASENSOR', 'Datexel', 'DEHN', 'Dekur', 'Destinus Energy (Opra Turbines)', 'Delachaux', 'Delbag (brand of Hengst)', 'Delcon', 'Delfin Vacuum', 'DELIMON / BIJUR DELIMON', 'DELTA POWER', 'Delta Sensor', 'Delta Tau (brand of Omron)', 'DeLuxe Stitcher', 'Demmeler', 'Denco Happel (brand of FLÄKTGROUP)', 'Deprag', 'Deserti Meccanica', 'Desko', 'DESTACO', 'Detector France', 'Deublin', 'Deutronic', 'Deutschmann Automation', 'Dhatec', 'Di-Soric', 'Diegner & Schade', 'DIEPA', 'Diesse', 'Dietz-motoren', 'Dietzel Hydraulik', 'Digital Control', 'Digitronic', 'Digmesa', 'DILO', 'DIMAC (Brand of Aetna Group)', 'DINA Elektronik', 'Dinamic Oil', 'Dinel', 'Dini Argeo', 'Diottalevi', 'DirectLOGIC', 'DISIBEINT ELECTRONIC', 'Dittmer', 'Dodge Bearings (Brand of ABB)', 'DOLD', 'Dollinger (brand of SPX Flow Technology)', 'Donati Sollevamenti', 'Dongan', 'Dormer Pramet', 'Doseuro', 'Dosiertechnik', 'DOTHERM', 'DP-Pumps', 'DR BOY', 'Dr. Brandt', 'Dreibond / Drei Bond', 'DRENO', 'Drescher', 'Drozdowski', 'DRTecnologie', 'Ducom Instruments', 'DUE EFFE', 'Dungs', 'Dunkermotoren (Brand of Ametek)', 'Dunphy Combustion', 'Dutch Regulators', 'Dutchi Motors (DUTCHI) (brand of Regal Beloit)', 'DVP Vacuum Technology', 'Dwyer Instruments', 'Dynalco (brand of Barksdale)', 'DYNAPAR'],
  'E': ['EAO', 'Era', 'EBT', 'Echelon', 'Eupec', 'Emod', 'Elan', 'EIesta', 'Elcon Components', 'Elcon / Pepperl', 'Elmed Eltra', 'Emerson', 'Endress & Hauser', 'Entrelec', 'Erab', 'ERC', 'Erni', 'ETA', 'E-Tec Swiss', 'Ettore Cella Spa', 'Euchner', 'EUROTHERM Exor', 'E+E Elektronik', 'E-T-A / ETA', 'E. Kretzschmar', 'E.L.B. / ELB Level Meters', 'EA Elektro Automatik', 'Eagle Signal Controls', 'EAO', 'EATON', 'EAW-Relaistechnik', 'EBARA / Ebara pumps / Hamada Blower', 'EBBCO', 'Eckart', 'Eckerle Hydraulic', 'Eckerle Industrie-Elektronik', 'Eclipse (Brand of Honeywell)', 'ECOFIT', 'ECOLAB', 'EDWARDS', 'Effegi Brevitti', 'EGB Elektrotechnische Geräte Böhlitz-Ehrenberg', 'EGE Elektronik', 'Egger Pumps', 'EGMO (brand of NEUMO)', 'EGT Eppinger GEARBOX', 'eickmann elektronik', 'Eilersen', 'Eipsa', 'Eirich / Maschinenfabrik Gustav Eirich', 'EITEC', 'EKD Gelenkrohr', 'Ekorex-Consult', 'Elap', 'Elbo Controlli', 'Elcis', 'Elco Industrie Automation', 'Elco Motors', 'eldec Induction (brand of EMAG)', 'Electro-Sensors', 'Electronicon', 'ELEKTRIM', 'Elektrogas (Brand of Elettromeccanica DELTA)', 'ELEQ', 'Elero Linearantriebstechnik', 'Elesa+Ganter', 'Elettrotec', 'Elfab', 'ELGA Veolia', 'ELGO Electronic', 'ELHAND TRANSFORMATORY', 'ELIMKO', 'ELIN', 'Ellard', 'Ellegaard', 'Elma Instruments', 'ELMA TT', 'Elma Ultrasonic', 'ELMESS', 'Elmetron', 'Elo Touch Solutions', 'Elobau', 'Elreha', 'ElringKlinger', 'ELRO Pumpen (brand of Crane)', 'ELSO Elbe', 'Elspro', 'ELSTO', 'ELT Fluid', 'Eltako Electronics', 'ELTE S.r.o', 'Elteco AS', 'Eltra', 'Eltratec', 'Eltrotec', 'EM Test (Brand of AMETEK)', 'EMAS', 'EMG Automation', 'EMG Elettronica (brand of NIDEC)', 'EMGR Elektromotorenwerk Grünhain', 'Emil Kammerer', 'EMILE MAURIN', 'Emirel', 'EMK Motor', 'EMOD', 'EMP s.r.o. (ELEKTROMOTORY A CERPADLA)', 'EMWB / Elektromotorenwerk Brienz', 'EMZ Motoren', 'Encore Electronics', 'END-Armaturen', 'Enda', 'Endevco', 'Endress+Hauser', 'Enemac', 'Enerdoor', 'Energo-Silesia', 'Energy Technology & Control Ltd', 'ENGEL ElektroMotoren', 'Enidine (Brand of ITT)', 'ENTES Elektronik', 'EPH-Elektronik (brand of Specken-DRUMAG)', 'EPHY-MESS', 'EPIC SENSORS / SKS Sensors / SKS Automaatio (Brand of Lapp Group)', 'Epidor', 'epis Automation', 'Equipe srl', 'ERGO Components / Bearings (Brand of Tecom)', 'Erhardt+Leimer', 'Eriez Manufacturing', 'ERKO', 'ERLO / IBERMACH / IBERDRILL', 'Ermaksan', 'ERO Electronic (brand of Eurotherm)', 'Erwin Halder', 'ES&S Solutions', 'ESA Eppinger', 'Esa Pyronics', 'Esband', 'Escherich / Dr. Escherich', 'Esco Antriebstechnik', 'Esitron Electronic', 'eska – Hydraulik', 'ESME', 'Esti Apparatebau', 'ESTUN AUTOMATION', 'Esweld', 'Etatron', 'Etscheid', 'EUBA Antriebstechnik', 'Euchner', 'EUPEC INFINEON', 'EURACRYL', 'Euro Motors Italia', 'EURO PRESS ITALY', 'Eurofluid Hydraulic', 'Euromac', 'Euromagnet', 'euromotori', 'Eurosei', 'EUROTEC Antriebszubehör', 'euroTECH', 'EUROTEK', 'EUROTROL', 'Evapco', 'Everblue', 'Evoqua Water Technologies', 'EWO', 'Excitech', 'EXITFLEX / POLYHOSE', 'Extech', 'EZM Industrie', 'Eztek'],
  'F': ['Faulhaber', 'Festo', 'FEAS', 'Fema Honeywell', 'Figaro', 'Ferraz Shawmut', 'Filtran', 'Finder', 'Fischer Elektronik', 'Foxboro', 'Freudenberg', 'Fuji Electric', 'F.ARDUINI', 'F.LLI / Ferrari Ventilatori Industriali', 'FABER KABEL', 'Fabory', 'FACOM', 'Fadal', 'Fafnir', 'Faggiolati Pumps', 'Fairchild Semiconductor (brand of Rotork)', 'FANDIS', 'FATEK', 'Faure Equipements', 'FAV - Favorit Filter / Filter & Anlagenbau Vollert', 'Fawcett Christie Hydraulics', 'FBF ITALIA', 'Feller Engineering', 'Felm', 'Felten & Guilleaume (brand of ATB)', 'Fema', 'FERGO Armaturen', 'Fermator', 'FERMOD', 'Ferrarini & Benelli', 'FerroTec', 'FESTO', 'FG Inox (FGInox)', 'FG Line S.r.l.', 'Fiama', 'FIBERFLON', 'Fiberware', 'FIBRO', 'Fife (brand of Maxcess)', 'Figaro', 'FIKE', 'Filterflo', 'Filtermist', 'Filtrox', 'FIMA Maschinenbau', 'FINDEVA', 'FineTek', 'FIP', 'FIPA', 'FIR Elettromeccanica', 'FIREFLY AB', 'First Sensor', 'FirstPower', 'Fischer Heatexchanger', 'FISCHER MESSTECHNIK', 'Fitok', 'Fixtest', 'FJ Peters', 'Flender (Brand of Siemens)', 'Flexitallic', 'FlexKraft (brand of KraftPowercon)', 'FlexLink', 'Flextech', 'FLO CONTROL Valves', 'FLÖTER', 'Flowserve', 'FLSMIDTH', 'FLUIDMIX', 'Fluiten', 'FLUITRONICS', 'FLURO', 'FMC', 'FMI (Fan Motors Italia)', 'FMV LAMEL', 'FOERSTER', 'FORFLON', 'FORSIS', 'Forster und Spille', 'FORT - PLASTY', 'Fortress Interlocks', 'Foseco', 'Foster Refrigerator (Division of ITW)', 'FOTEK CONTROLS', 'FRABA Posital / Vitector / Conistics / Centitech', 'Fraccarolo Pompe', 'FRAISA', 'framag', 'Frameco', 'FRANCIA', 'Franke Bearings', 'FRANKE-Filter', 'Franklin Electric', 'Fratelli Laveggi', 'Frer', 'Friedrich Schwingtechnik Vibrator Motor / Vimarc', 'Friedrichs FILTERSYSTEME', 'Frizlen', 'Fromme Armaturen', 'FrymaKoruma', 'FSG (Fernsteuergeräte Kurt Oelsch)', 'FST (Filtrations-Separations-Technik)', 'FuehlerSysteme', 'FUG Elektronik', 'Fuji electric', 'FUJI HENSOKUKI', 'Füll Systembau / Fuell Systembau / Full Systembau', 'Fumo', 'Funke Wärmetauscher', 'FUTEK', 'Future Life Technology'],
  'G': ['GE', 'Gemü', 'GE Fanuc', 'Gefran', 'Gestra', 'General Monitors', 'Good Will Instrument', 'GPH', 'Grayhill', 'Greisinger', 'Groschopp', 'G-E-O-S (brand of Specken-DRUMAG)', 'Gaestopas', 'GAI-TRONICS (Hubbell Company)', 'Galan', 'GALI', 'GALIGANI FILTRI', 'Galtech (brand of Walvoil)', 'Gamma System', 'GANTER GRIFF', 'Gantner Instruments', 'Gantrex', 'GARBARINO & TITONEL', 'Garioni Naval', 'Garlock', 'GARTEC', 'GDS Technologies', 'GEA AWP', 'Gebr. Wanner', 'Gebrüder Frei', 'GECO', 'GEFEG-NECKAR', 'GEFRAN', 'GeGa (brand of Alpine Metal Tech)', 'Gelbau', 'Gemels', 'Gemmecotti', 'Gems Sensors & Controls', 'GEMÜ / Gemu', 'Generalmatic S.R.L.', 'Georg Schlegel', 'GEPE', 'GERARDI', 'GERNEP', 'gesint', 'GFA Elektromaten', 'GGB Bearings', 'GHIBSON VALVES', 'GHM Messtechnik (member of GHM Group)', 'GIGA-TMS', 'Gigant Italia', 'Gimatic', 'Gleason-Pfauter / HURTH Gleason', 'GMN', 'GMW / Gilgen, Müller & Weigert (GOSSEN Metrawatt)', 'Gneuss', 'Goldammer Regelungstechnik', 'Gönnheimer', 'GORATOR / KLÄRFIX (brand of HIMMEL Technologies)', 'Gorman-Rupp Pumps', 'GOSSEN Metrawat', 'GOUDSMIT MAGNETICS', 'Goulds Pumps (brand of ITT)', 'GOYEN / Mecair / Goyen Mecair (Brand of Pentair)', 'Graco', 'Graessner (Brand of Nidec)', 'Gräff / Graeff / Graff', 'Granch Filtration', 'GRANIGLIATRICI', 'Grayhill', 'Greisinger (member of GHM Group)', 'GRI Pumps (Gorman-Rupp Industries)', 'Gribetz International', 'Grices', 'GRIS', 'Groschopp', 'GRÜN-Pumpen / GRUN-Pumpen', 'GRUNER', 'GS Industrie Elektronik', 'GSC Schwörer / GSC Schwoerer / GSC Schworer', 'GSR Ventiltechnik', 'Gualapack', 'Guarnitec', 'Güdel / Gudel / Güdel SUMER', 'GUK Falzmaschinen', 'Günter Wendt / Gunter Wendt / Guenter Wendt', 'Guntermann & Drunck / G&D', 'Günther', 'Gutekunst Federn', 'GVS Filter Technology', 'Georgin', 'GMC'],
  'H': ['Harwin', 'Helios Helvar', 'HBM', 'HEIDENHAIN', 'Helukabel', 'Hellermann', 'Hengesbach', 'Hengstler', 'Herion Hima', 'Hinkel', 'Hirose Electric', 'Hirschmann', 'Hitachi', 'Hobut Hohner', 'Holec', 'Hoyer', 'Honeywell', 'Hydac', 'Hytor', 'Haag + Zeissler', 'Habasit', 'Habonim', 'Haden & Custance', 'HAFNER Pneumatik', 'HAGE Sondermaschinenbau', 'HAGER', 'Hagn', 'Hahn Gasfedern', 'HAIMER', 'Hainbuch', 'HAINZL', 'Hakko', 'Halifax Fan', 'Ham-Let', 'Hamburg Dresdner Maschinenfabriken', 'Hamburger Transformatorenbau', 'Hammerle Maschinenfabrik', 'Hammond Manufacturing', 'Hänchen', 'Hanchen (Haenchen, Hänchen)', 'Hänel', 'Hans Brunner', 'Hansa-Motoren', 'HanseLifter', 'Hansen Technologies', 'Harmonic Drive', 'Harms & Wende', 'Harowe (Brand of DYNAPAR)', 'Harris & Bruno', 'HARRY GESTIGKEIT', 'Harting', 'HAUBER-Elektronik', 'HAUG', 'HAUG Kompressoren (brand of Sauer Kompressoren)', 'Hawe', 'Hawk Measurement Systems', 'HBS Valves', 'HCC/KPM (part of HerkulesGroup)', 'Headline Filters', 'Heid Antriebstechnik', 'HEIDLAND', 'Heimatec', 'HEINE Resistors', 'Heinemann Electric (brand of Eaton)', 'Heinrich Frey Maschinenbau', 'Heinrichs Messtechnik (brand of KOBOLD)', 'HEITRONICS Infrarot Messtechnik', 'Helical Products Co', 'Helios Ventilatoren', 'Helios-Preisser / Preisser Messtechnik / HP', 'Helling', 'Helm Instrument', 'Helmholz', 'Helmke', 'HEMOMATIK', 'Hendor Pompen', 'Hengstler', 'Henkovac Vacuum Systems', 'Henschel', 'Hense Wägetechnik', 'Hensle Zuführtechnik (Eugen Hensle)', 'Hepco', 'Hepco&Becker', 'Herding Filtertechnik', 'Herkules Machinetools (part of HerkulesGroup)', 'HERMA', 'Herose', 'HERREKOR S.L.U.', 'HERZOG MASCHINENFABRIK', 'Hesch', 'Heun Funkenerosion', 'HIDRACAR', 'Hifi Filter', 'High Perfection Tech', 'Hilco Industrial', 'Hillesheim', 'HIMMEL Technologies', 'HIQUEL', 'Hirlinger', 'Hiross-Zander Division of Parker Filtration', 'Hiwin', 'HKS', 'HOBA', 'HOERBIGER', 'HOFMANN Mess- und Teiltechnik', 'Hohner', 'holthausen elektronik', 'HOLZMA', 'HOMA', 'HOMAG', 'HOMBAK (brand of Siempelkamp Group)', 'Honeywell', 'Hönle / Hoenle / Honle', 'Honsberg (member of GHM Group)', 'Hora', 'HORN (Dr. E. Horn)', 'HORN Glass', 'HORST', 'Horter & Kalb', 'Hougen', 'HPC Engineering', 'Hub City Inc (brand of Regal Beloit)', 'HUBA CONTROL', 'HUBER+SUHNER', 'HUMBERT & POL', 'HURON GRAFFENSTADEN', 'Hurst Motors (brand of NIDEC)', 'Hutchinson (marken Poly V / FleXonic / ConveyXonic)', 'Hydac', 'HYDAIRA (brand of SPECKEN-DRUMAG)', 'HYDRIS Engineering', 'Hydro Control', 'HYDRO PROKAV', 'HYDRO ZNPHS', 'HYDROKOMP', 'Hydrolas', 'HYDROMA', 'Hydropa', 'HYDROTECHNIK', 'Hypex', 'HYPROSTATIK', 'Holland Special Pumps BV (HSP)'],
  'I': ['IFM', 'Ione', 'Idec', 'Igus', 'ISFT Siemens', 'INA', 'Italvibras SpA', 'ITW Paktron', 'IWKA', 'Ixys', 'I-TORK CONTROLS', 'I.R.E. INDUSTRIA RESISTENZE ELETTRICHE', 'I2SE (Brand of In-Tech)', 'IBAG', 'IBC automatic / IBC control', 'IBH Softec', 'IBIS', 'ICHEMAD-Profarb', 'ICM Trasduttore', 'ID Insert Deal', 'IDAM Bearings (brand of Schaeffler Technologies)', 'IDEC', 'IDROTECK', 'iemca', 'IES Soler', 'IFM', 'ifs Industriefilter', 'Igeba', 'IGEL Electric', 'Igema', 'Igus', 'Ihne & Tesch / Keller Ihne + Tesch', 'IKA-Werke / IKA', 'IKUSI', 'Iloxair (brand of FLÄKTGROUP)', 'ILT / UNIFIL', 'IMA S.p.A', 'IMAV', 'IMC', 'IMOS Gubela', 'IMSAB', 'imsystem', 'IN-ECO', 'INA / Schaeffler', 'INDAG Pouch', 'INDEX TRAUB', 'Indramat Bosch Rexroth', 'INDUR', 'Industrieregler', 'Inelta Sensorsysteme', 'INFORM ELEKTRONIK', 'Ingersoll Cutting Tools', 'Inkoma / Albert', 'INMATEC', 'INNOLevel', 'INOR', 'Inox', 'INOXMIM', 'Inpipe', 'Instrum Ventile', 'INSYS MICROELECTRONICS', 'InterApp', 'Interelektrik', 'Interface', 'Intermec (by Honeywell)', 'Internormen (Brand of Eaton)', 'Interroll', 'Intorq', 'Intra-Automation', 'Intralox', 'IPC PORTOTECNICA', 'ipf electronic', 'IPL (Industrie Plastiche Lombarde)', 'IQD Frequency Products', 'IRCON (brand of Fluke Process Instruments)', 'IREM', 'Isabellenhütte Heusler', 'Isel', 'ISHAN PRECISION', 'ISMATEC', 'ISRA Vision', 'IST - International Sensor Technology', 'IST METZ / UV', 'IST Pumpen und Dosiertechnik', 'ITAL Technology', 'Italcoppie Sensori', 'ITALGROUP', 'ITALSENSOR', 'Italvibras', 'Italvibras / Italvibras G. Silingardi SpA', 'Itowa', 'ITT Lowara', 'IWAKI', 'iwis', 'IXYS'],
  'J': ['JAE', 'Johnson Pump', 'Jean Müller', 'Johnson Components', 'Jumo', 'Johnson Controls', 'Jowa', 'JABSCO', 'JACKSON SAFETY', 'JACOB ELEKTROTECHNISCHE FABRIK', 'Jacob Söhne', 'JAKSA', 'Jalema', 'James Walker', 'JASTA Armaturen', 'Jauch Quartz', 'JAUDT Dosiertechnik Maschinenfabrik', 'JAURE (Kop-flex) (brand of Regal Beloit)', 'JBJ Techniques', 'JC Valves', 'Jenco', 'JESSBERGER', 'Jetter', 'JKO MEZ', 'Joest / Jöst', 'John Zink Hamworthy Combustion', 'Johnson Pump (brand of SPX FLOW)', 'Jones shipman international', 'Jorgen Bork Electronic', 'JOVENTA', 'JOYNER pneumatic', 'JSW / Japan Steel Works', 'Jtekt H.P.I', 'JUCHHEIM', 'JUD', 'JUDO Water Treatment', 'JUMO', 'JUNG PUMPEN (brand of Pentair)', 'Jungmichel Industrieelektronik', 'JUNGNER', 'JUNWELL', 'JVL Drives', 'JVM Antriebe'],
  'K': ['Kager Kanthal', 'Kidde Fenwall', 'Katadyn', 'Keyence Corporation', 'Kraus & Naimer', 'Kidde – Deugra', 'KROHNE', 'Kromschroder', 'Kuhnke', 'KUKA', 'K-Tron', 'Kabeltec', 'Kaefer / Käfer', 'Kallfass Verpackungsmaschinen', 'Kaltenbach', 'Kalthoff Elektro', 'Kalthoff Luftfilter und Filtermedien', 'KAMAN Sensors', 'Kannegiesser', 'Kapego', 'KARBERG & HENNEMANN (Brand of C.C.JENSEN)', 'Karl Klein Ventilatorenbau', 'Kato Engineering (brand of NIDEC)', 'Kavlico (brand of Sensata Technologies)', 'KAWAHARA', 'KEIL Fixing', 'Keller & Kalmbach', 'Keller Cellatemp (part of LEGRIS INDUSTRIES)', 'KELLER HCW (part of LEGRIS INDUSTRIES)', 'KELLER ITS (part of LEGRIS INDUSTRIES)', 'Keller Lufttechnik', 'KELLER MSR (part of LEGRIS INDUSTRIES)', 'Kelvion (GEA Heat Exchangers Group)', 'KEM Co.', 'KEM Kueppers', 'Kemet', 'Kemmerich Elektromotoren', 'Kemmler', 'KENDRION', 'Keofitt', 'KEPFrance', 'Keyence', 'Keysight', 'KEYSTONE (brand of Emerson)', 'KHD Humboldt Wedag', 'KHK Kohara Gear Industry', 'Kieback & Peter', 'Kieback & Peter', 'Kiekens', 'Kiesel', 'KIESELMANN', 'Kimo Antriebstechnik / KIMO Industrial Electronics', 'KINETROL', 'Kipp', 'KISSLING', 'Kistler-Morse', 'KIT Electroheat Limited', 'KITAGAWA', 'KITAGAWA Gas Detector', 'Kittner Anlagen-und Maschinenbau', 'KKS Ultraschall', 'Klaschka', 'Klay Instruments', 'Klein Elektronik', 'Klein GmbH Maschinenbau', 'Kleinesdar Warmetechnik', 'Kleintges Elektrogerätebau', 'Klemko Techniek', 'KLINGER', 'KNF Flodos', 'KNF Neuberger Pumps', 'KNICK', 'KNIPEX', 'KNOLL Maschinenbau', 'KNORR / MAKRA / AMAKON (brand of Alpine Metal Tech)', 'KOBOLD', 'KOCH FILTER', 'KOGANEI', 'Kohlhoff Hygienetechnik', 'Kollmorgen Steuerungstechnik', 'KOMPASS / ASADA Hydraulic Components', 'KOSTROJ', 'Kotlin Sensors', 'KPO Schrauben', 'Kracht', 'KRÄMER+GREBE', 'Krautkramer (brand of GE Sensing & Inspection Technologies)', 'Krautloher', 'KRELUS', 'KRIWAN', 'KROEPLIN dimension measurement', 'Kromschroeder / Kromschröder / Kromschroder', 'Kronenberg', 'KS Klima-Service', 'KS Tools', 'KSB', 'KSR Kuebler (Brand of WIKA Group)', 'KTR', 'Kuebler / Kübler', 'Kuenle Antriebssysteme', 'KÜHME (KUHME) Armaturen', 'Kuhne electronic', 'Kuhnke (Brand of Kendrion)', 'Kuipers Food Processing Machinery', 'Kulicke & Soffa', 'Kullen', 'Kurz / Kurz Instruments', 'KYB', 'Kytola'],
  'L': ['Laird Technologies', 'Legrand', 'LANDIS & GYR', 'Lapp Kabel', 'Lemo', 'Laser Components', 'Lenord & Bauer', 'Lenze Leuze', 'Lindner', 'Lütze', 'LABELLERS', 'LABOM', 'Lach Diamant', 'Laetus', 'LaGrange Products', 'LAIPPLE KEB / BRINKMANN', 'Lamb Electric (brand of AMETEK)', 'Lammas', 'LAMPAR', 'Landustrie Sneek', 'Lang & Schmidt', 'Langer Messtechnik', 'Lapmaster Wolters', 'Lapp Kabel', 'LARIUS', 'Laska', 'LAT Antriebstechnik', 'Lauda', 'LAUMAS', 'LB (LB-Technology)', 'LBBC Technologies', 'LEACH (brand of Esterline Power systems)', 'LEDUC', 'Leeson (brand of Regal Beloit)', 'LEG', 'LEHMANN MILLS', 'Leifert Induction', 'LEISTER', 'Lenntech', 'LEUSCH', 'Leutert', 'Leuze electronic', 'LEWA', 'LewVac', 'LFC LOCHEM (Brand of Filtration Group)', 'LG-Automatic', 'LI-BE / S.4M Bearings', 'Lika Electronic', 'LINCOLN / Vogel Lubrication (brand of SKF)', 'Lincoln Electric', 'Lindner-Recyclingtech', 'LINDY', 'LINEA PACK', 'Link Belt', 'LINSINGER Maschinenbau', 'LION Precision', 'LIQUIP', 'Littelfuse', 'LJM Hydraulik', 'LJU Automatisierungstechnik', 'LNS America', 'Loc-line', 'Lockwood by Loc-Line', 'Löhrke / LOEHRKE', 'LOOS International / Bosch Industriekessel', 'Lorentzen & Wettre (Brand of ABB)', 'Lorenz Messtechnik', 'LORENZONI', 'LOSMA', 'Lotzer & Mühlenbruch', 'LOVATO', 'Lowe', 'LS MECAPION', 'LTC-Lufttechnik', 'LTN Servotechnik', 'Lüber', 'Lüdecke / Luedecke', 'Lumberg Automation', 'Lumistar', 'Lunardon', 'Lutz Blades', 'Lutz Pumps', 'Lütze / Lutze / Luetze', 'LVF'],
  'M': ['MAC VALVES', 'Malico Maxon', 'Macro Sensors', 'MAE Motori', 'Maxthermo', 'MAGNETROL', 'Mayr', 'Mayser', 'Mean Will', 'Meder', 'Mennekes', 'Midcom Transforming', 'Magnetics', 'Moeller', 'Moos', 'MOXA – Industrial', 'MTL Instruments', 'MTS Sensor', 'Murr Elektronik', 'MuTech Corporation', 'Müller Industrie Elektronik', 'M&C TechGroup', 'M&L Consulting', 'M&S Armaturen', 'M+F Keg-technik', 'M.C. Automations', 'M.S. RESISTANCES', 'MACK Werkzeuge', 'MADI', 'MAFA - Sebald', 'MAFAG', 'Magnemag (brand of Alpine Metal Tech)', 'Magnescale', 'Magnet Schultz', 'Magnetbau Schramme', 'Magni', 'MAGPOWR (brand of Maxcess)', 'MAGSY', 'MAHLE (Filtration Group)', 'Maico', 'Maillefer', 'MAJA-Maschinenfabrik', 'MAKISHINKO', 'Makopak', 'Mallardi Firenze', 'MALONEY TECHNICAL', 'Mannesmann Demag', 'MAPRO INTERNATIONAL', 'Marathon Electric (brand of Regal Beloit)', 'Marbach', 'MARBETT (brand of Rexnord)', 'March Pumps (MARCH PUMPEN)', 'Marchel', 'Marden Edwards', 'MarelliMotori', 'Mario Ferri', 'Marl International', 'Marquardt', 'Marvel Engineering', 'Marzorati', 'Maschinenfabrik Reinhausen', 'MASTER PNEUMATIC', 'Mato', 'MATRASUR COMPOSITES', 'Mattke', 'Maxcess', 'MAXIMATOR', 'Maxitrol', 'Maxon Motors', 'MAXSEE', 'MAXTEC', 'Maxthermo-Gitta', 'Maxwell', 'MAYR', 'MAYSER', 'Mazurczak', 'Mazzei', 'MBA Instruments', 'MBM Motori', 'MBS', 'McDonnell & Miller (brand of Xylem)', 'MCgill (brand of REGAL BELOIT)', 'McLellan', 'MD Micro Detectors', 'MDJ Electronic', 'Meca-Inox', 'Mechafin', 'Mechan controls', 'Meclube', 'MEDAN', 'Medenus', 'MEGATRON', 'Mehrer', 'Meister Strömungstechnik', 'Melegari', 'Merkle-Korff Industries (brand of NIDEC)', 'Merlett', 'MERZ', 'MESA Electronic', 'Meta Hydraulic', 'Metafram (brand of Sintertech)', 'Metal Work', 'METKON', 'Metrix Instrument', 'Metronix (Brand of Apex Tool Group)', 'meurer', 'Meusburger', 'MG-TRASFORMATORI', 'MGFTools', 'MGM Electric Motors', 'MGV Stromversorgungen', 'MH-TEC', 'Micatrone', 'Micro Motors', 'Micronor', 'Microprecision', 'Micropump', 'Microsonic', 'Microstar Laboratories', 'MIDDEX-ELECTRONIC', 'Miki Pulley', 'Mikro-Mess / Micro Mess', 'MIKSCH', 'Milton Roy', 'Mindman', 'Minebea', 'MinebeaMitsumi', 'Mingardi', 'Mini Motor', 'miniBOOSTER Hydraulics', 'Minipress', 'Mink Bürsten', 'Misia', 'Mission (brand of National Oilwell Varco)', 'MISUMI', 'Mitsubishi Electric', 'Mittelmann', 'Mitutoyo', 'miunske', 'mk Industrievertretungen', 'MMC International Corporation', 'Mobrey (Brand of Emerson)', 'Moller-Preussler Transformatoren', 'MOLLET', 'Moniteur Devices', 'Mono Pumps (Ezstrip)', 'Montech', 'MONTWILL', 'Morgan Rekofa - Moog Rekofa (brand of Moog)', 'MORSE-STARRETT', 'MÖRZ / MORZ', 'Motan', 'Motec (brand of AMETEK)', 'Motor Power', 'Motrona', 'Moujen', 'Mountz Torque', 'Mouser Electronics', 'Mouvex (member of PSG DOVER)', 'MP Filtri', 'MPS Gradior', 'MSK', 'MSR-Electronic (Gaswarnsysteme)', 'MST IT / MSTox', 'MT Motori Elettrici', 'MTM Power', 'MUBEA', 'Mueller (Cleaning. Packaging. Plastics)', 'Müller + Ziegler', 'Muller Beltex', 'MuLogic', 'Murata Power Solutions', 'MUROMOTO TEKKO', 'Murrelektronik', 'Murtfeldt', 'MUT Meccanica', 'MVA', 'MWM', 'MWM Freni Frizioni', 'MWT Mess- und Wiegetechnik'],
  'N': ['Negele', 'Nord Getriebebau', 'Niezgodka', 'Nivelco', 'Notifier', 'Norgren', 'NovoTechnik', 'Numatics', 'Nuovo Pignone', 'NABERTHERM', 'Namco (brand of Specialty Product Technologies (SPT))', 'Nasco', 'nass magnet', 'NBC Elettronica', 'NBI', 'NBS Technologies', 'NEMICON', 'Neri Motori', 'Netter Vibration', 'Neugart Gears', 'NEUHOF', 'NEUTRAL', 'NEUTRIK', 'New Elfin', 'NEWTEC BAG PALLETIZING', 'Nexen', 'NGR', 'Nicomatic', 'NIDEC Motor', 'NIGATA', 'NIEZGODKA', 'NIHON PISCO', 'NIJHUIS-WATER', 'NIK LIGHT', 'NIMAK', 'NIOB FLUID', 'Niryo', 'NK Technologies', 'NK Neuenhauser Kompressorenbau GmbH', 'NMB Bearings', 'Nocado', 'Nocchi pumps (brand of Pentair)', 'Nöding Meßtechnik', 'Nokeval', 'Nolimal', 'NORBIT', 'Norbro (brand of FLOWSERVE)', 'Nordic Seal', 'Norelem', 'NORGREN /NORGREN HERION / HERION', 'Noris Armaturen', 'NORIS Group', 'Nosta', 'Nova Rotors', 'Novaflex', 'Novotec (System- und Industrietechnik)', 'Novotec EDM', 'Novotechnik', 'Novotron', 'NOXON', 'NSM MAGNETTECHNIK', 'NTN-SNR', 'NTZ-Filter', 'Nuega / Nüga', 'Numatics', 'Numerik Jena', 'Numtec (brand of Alpine Metal Tech)', 'Nila Premier Pte Ltd. - Protankgrüp'],
  'O': ['Octagon', 'OMUV', 'OEZ', 'Omega', 'Optek – Danulat', 'Omron Electronics', 'Oupin', 'OPRA Turbines', 'OBERMUEHLE POLYMERTECHNIK', 'Ocme', 'ODU', 'Oerlikon', 'Oerlikon Leybold', 'OESSE', 'OFC - Ompi Fluid Control', 'Ogura', 'OK International', 'OK Packaging Systems', 'Oleodinamica Marchesini', 'OLTREMARE S.P.A.', 'OMAC', 'Omec Motors', 'OMEC Srl', 'OMERA', 'OMET', 'OMFB SpA', 'OMPI', 'Omron', 'OneHalf20', 'OPKON Elektronik', 'Oppermann Regelgeräte', 'optek-Danulat', 'OPTIMA Packaging', 'optris', 'orange research', 'ORIENTAL MOTOR', 'Orsta', 'Ortlinghaus', 'OSIP Pump', 'OSSBERGER', 'Ott Antriebe', 'Ott Jakob Spanntechnik', 'Otto Hydraulics', 'OTTO JUNKER', 'OWECON', 'OxySense'],
  'P': ['Pac Tec', 'Papst', 'Parker', 'Panametrics', 'Pfannenberg', 'Panasonic', 'PEP', 'Pepperl & Fuchs', 'Phoenix Contact', 'PIEPER GbmH', 'Pilz', 'Pizzato Elettrica', 'Planar Systems', 'PORTESCAP', 'Power One', 'Powertip', 'Powerware', 'ProLinx', 'PTR Messtechnik', 'P. Müller Prazisions-Messwerkzeugfabrik', 'Packo Pumpen', 'Paguflex', 'PALLMANN Maschinenfabrik (brand of Siempelkamp Group)', 'PAMAS', 'Papenmeier', 'Parker (Parker Haniffin)', 'PARPAS', 'PASI', 'PATLITE', 'Paul Eberspächer Antriebstechnik', 'Pawling Engineered Products', 'PCH Engineering', 'Pearl Rotary Joints (brand of SHOWA GIKEN INDUSTRIAL)', 'Peddinghaus', 'PEDRAZZOLI', 'Pedro Gil', 'Pegasus Actuators', 'PEI / P.E.I.', 'Pekos Valves', 'PEMICRO', 'PENBERTHY (brand of Emerson)', 'Penko', 'Penny+Giles', 'Pentair Valves & Controls (Brand of Emerson)', 'PENTAX', 'Pepperl+Fuchs', 'PERA-PELLENC', 'Perfecta', 'Permaglide', 'PES - Product Engineering Services', 'PESA WAAGEN', 'Peter Electronic', 'PETREL', 'Petzholdt-Heidenauer', 'pewag', 'PEWATRON', 'Pfankuch Solutions', 'Pfeiffer Vacuum', 'PFLITSCH', 'PHD', 'Pi-Tape', 'PIAB', 'PIBOMULTI', 'PIERCE CONTROL AUTOMATION', 'Pietro Fiorentini', 'PIL Sensoren', 'PINTER', 'PINTSCH TIEFENBACH SCHALTBAU', 'PIX', 'Pizzato Elettrica', 'PLANOLITH', 'PLANONLIGHT (brand of Hagn', 'Platz', 'PM B.V.', 'PMA (Brand of ABB)', 'PMC (Plasmatechnik Markus Colling)', 'PMV (brand of FLOWSERVE)', 'Pneumatech', 'Pneumatis', 'Pneutrol', 'Pofer srl', 'Poirino', 'Pollard Pumps', 'Pollrich DLK', 'Polylux', 'Polytec', 'POM-VAK', 'Pomac Pumps', 'POMPE CUCCHI', 'Pompe Garbarino', 'Ponndorf Schlauchpumpen', 'Poppi Clementino', 'Postberg+Co.', 'POWER-GENEX - Automatic Valve Accessories', 'POWER-HYDRAULIK', 'PowerSparks (part of HerkulesGroup)', 'PQS TECHNOLOGY', 'PR Electronics', 'Precimeter', 'Precitec', 'Prema Service', 'PRENSOLAND', 'Presys', 'Prevost', 'Pro-face', 'PROCES-DATA', 'PROCESS ELECTRONIC (brand of UPC)', 'Process Informatik', 'Procon Trommelmotor', 'PRODUAL', 'PROFROID', 'Progalvano', 'Promicon', 'Protempo', 'PROVIBTECH', 'PROXITRON', 'PS Automation', 'PTI', 'PTR', 'PULS', 'Pulsafeeder', 'Pulsotronic', 'Pumpac', 'Purex', 'Puritan Bennett', 'Purtrex Cartridge filters (brand of GE)', 'PVR Vacuum Design', 'PVS Sensors (Preferred Valued Supplier)', 'Pyromation', 'Protankgrüp - Nila Premier Pte Ltd.'],
  'Q': ['Quarz Com', 'Qubiqa Esbjerg', 'QEM', 'Q-FILTER SYSTEMS', 'Quma', 'QTS'],
  'R': ['R. Stahl', 'Relpol', 'RAD', 'Rafi', 'RMG', 'Raychem', 'Rechner', 'Releco', 'Reliance Electric', 'RFS', 'Rittal', 'Riepe', 'Rockwell', 'Ropex', 'Rosemount', 'Rossi Motoriduttori', 'Rotronics', 'R + B Filter', 'R+L HYDRAULICS', 'R+M de Wit', 'R+W / R+W Antriebselemente', 'RADIO-ENERGIE PRECILEC (brand of AMW Group)', 'RAEL MOTORI', 'RAFI', 'Raja Lovejoy', 'Ralf Brinkmann', 'Ralpe', 'Ralux', 'RAMA Packaging & Automation', 'Ranco (brand of Robertshaw)', 'Rastelli Raccordi', 'Rausch & Pausch / RAPA', 'RAVIOLI', 'Rawet', 'RBC Bearings', 'REA Kennzeichnung und Codierung', 'Rechner', 'RECKLI', 'RECKMANN', 'RECO', 'Red Lion', 'RED-RING', 'Redokon', 'REDUR (brand of Phoenix Mecano)', 'REFORM Grinding Technology', 'Reggiana Riduttori', 'Regin Controls', 'REICH KUPPLUNGEN', 'Reiku', 'Reinhardt-Technik (brand of WAGNER Group)', 'Reiss Messtechnik', 'RELPOL', 'REMBE', 'REMLIVE', 'Renner Kompressoren', 'REO ELEKTRONIK REOVIB', 'RESATEC AG', 'ReSatron', 'Resistoflex (brand of CRANE)', 'REVALCO', 'REVEYRON', 'Rhein-Getriebe', 'Rice Lake Weighing Systems', 'RICKMEIER', 'Rico-Werk', 'Rieger Schenk', 'Riegler', 'Riello ups', 'Rietschoten', 'Riken seiki', 'Rinck Electronic', 'RINGFEDER', 'Rittal', 'RITZ INSTRUMENT TRANSFORMERS', 'RIV RUBINETTERIE ITALIANE VELATTA S.p.A.', 'RJS Corporation', 'RK Rose + Krieger (A Phoenix Mecano Company)', 'RK Rose+Krieger (brand of Phoenix Mecano)', 'RKC INSTRUMENT', 'RMG Messtechnik', 'RNA Automation', 'Robers & Co. (Robers & Brandt Elektrotechnik)', 'Robino & Galandrino', 'Rochling (Röchling, Roechling)', 'ROESSEL-Messtechnik / Rössel-Messtechnik / Rossel-Messtechnik', 'Rogatti', 'Rohde & Schwarz', 'Roland Electronic', 'Ronken Industries', 'Ropex', 'Roquet', 'Rosa Sistemi', 'ROSE Systemtechnik (brand of Phoenix Mecano)', 'Rössel', 'Rossmanith', 'Rotar', 'ROTFIL', 'Roth Kompensatoren', 'Rotodyne Asselbergs', 'Rotor NL (brand of Regal Beloit)', 'Rotterdamse Elementen Fabriek', 'Roxell', 'RPM Motori Elettrici', 'RS Pro', 'RSF Elektronik', 'RSGetriebe (part of HerkulesGroup)', 'RTA', 'RTK (Regeltechnik Kornwestheim)', 'Rubinetterie Paracchini', 'RUBSAMEN & HERR', 'ruck Ventilatoren', 'Rudolph Tietzsch', 'Ruko', 'RULMECA', 'Rusch Pumpen', 'Russell Finex'],
  'S': ['SAB', 'Schaffner', 'SAAB AB', 'Samtec', 'Elektronik', 'Sarel', 'Schaevitz Sensors', 'Schleicher', 'Schmalz', 'SCHMERSAL', 'SCHNEIDER ELECTRIC', 'Schrack', 'SCHROFF', 'SES – Sterling', 'SEW – EURODRIVE', 'SHC', 'SIBA', 'SICK', 'SIEI', 'Siemens Automation', 'Siemens Building', 'Siemens Landis', 'SMC – PNEUMATIK', 'Sola Hevi Duty', 'Solartron Mobrey', 'SolarTurbines', 'Sonnenschein', 'SOR', 'Spectro', 'Spohn & Burkhardt', 'Souriau', 'Stahl', 'Stange', 'Stasto', 'Stenfors', 'Stonel', 'Sunon', 'Swichcraft', 'Sylvana', 'SACEMI-GAMAR', 'Saelzer Electric / Sälzer / Salzer', 'Safeway Hydraulics', 'SAGINOMIYA', 'SAI Hydraulics', 'SAIER Dosiertechnik', 'Sala', 'Samchully', 'Samiflex', 'SANCASSIANO', 'Sänger Rollenlager', 'Sanovo', 'Sanwa Iwaki Hydrotech pumps', 'Sapitflex', 'Sartorius', 'SAT SEMER Anlagen-Technik', 'SAT STERLING', 'SATI', 'Saunders (brand of CRANE)', 'Sauter Feinmechanik', 'Sauter-Cumulus', 'SAVINO BARBERA', 'SAWA', 'sawi', 'SBA-TrafoTech', 'SCA', 'SCA Schucker', 'Scaldalai', 'Scanbelt', 'Scancon', 'Scandymet', 'Schaefer Elektronik', 'Schaffner', 'SCHALLENKAMMER MAGNETSYSTEME', 'Scharfenberger', 'SCHAUBLIN', 'SCHEUCH', 'Schiltknecht', 'Schimpf', 'Schischek', 'SCHLEIFRING APPARATEBAU', 'Schlick', 'Schlösser EUROTRONIK (Schloesser)', 'Schlüter', 'Schmalz', 'Schmersal', 'Schmidt Messtechnik', 'Schmöle', 'Schniewindt', 'Schnupp Hydraulik', 'Schönbuch Electronic', 'SCHOTT Technical Glass Solutions GmbH', 'Schrack', 'SCHROEDAHL (brand of CIRCOR Group)', 'Schroeder Schrauben / Schröder Schrauben', 'Schubert & Salzer', 'Schubert System Elektronik', 'Schultze RiRo', 'SCHUNK', 'Schuntermann', 'Schurter', 'SCHUTZE SPRITZTECHNIK / ALFRED SCHÜTZE', 'Schwarzbeck Mess-Elektronik', 'SCOMES', 'Scutti', 'SCV SYSTEM', 'SDE (Schmitt-Degenhardt Elektronik)', 'Sealand / Sea-land', 'Sealumet', 'SEAP', 'Seat Ventilation', 'SECATEC-Sensoren', 'SED Flowcontrol', 'SEDIS', 'SEEPEX', 'sefco', 'SEG (S-E-G Instrument)', 'SEICO Heizungen', 'SEICO Industrie-Elektrowärme', 'SEIKA Mikrosystemtechnik', 'SEIKOM Electronic', 'SEIM', 'Seko', 'Selbach', 'Select Automation', 'SELEE Corp.', 'SELET', 'Seli', 'SEMCO (brand of FLÄKTGROUP)', 'Semikron', 'Semperit Gruppe (Sempermed / Semperflex / Sempertrans /Semperform)', 'SENECA', 'SenoTec', 'SENSIT', 'SENSOPART', 'SENSOR CONTROL', 'Sensor Development, Inc. / SDi', 'Sensor Instruments', 'Sensus (brand of Xylem)', 'Sensy', 'SENZANI BREVETTI', 'SENZORTECH', 'SEPA EUROPE', 'ser elektronik', 'SER MEGA (Elektronik & Schweißtechnik)', 'sera ProDos', 'SERMES / ALMO', 'SERTO', 'SERVOMAX (Brand of R+W)', 'Sesame Motor Corp.', 'Sesino', 'Setra Systems', 'Setzermann Transformers', 'SEVA-tec', 'Sferax', 'SGF (Süddeutsche Gelenkscheibenfabrik)', 'SHIELD', 'Shimadzu', 'SHOWA GIKEN INDUSTRIAL', 'Siboni', 'Sick', 'Sicme Motori', 'Sicoplan (brand of Siempelkamp Group)', 'Siebert Industrieelektronik', 'Sigerist', 'Sigma HLR Valves', 'Siko', 'SIMACO elettromeccanica', 'SIMCO', 'Sinbran', 'Singla Scientific Glass Industries', 'SIPA solutions S.p.A (brand of Zoppas Industries)', 'Sirca International', 'Sircal Instruments', 'SIT Antriebselemente', 'SIT Drive Solutions', 'Sitema', 'SITI MOTOR', 'SKF', 'SKS Mekaniikka', 'SKS-SIERSEMA', 'SLICE', 'slittec', 'SMAR', 'SMARIS', 'SMITEC', 'SMP Sintermetalle Prometheus', 'SMW-AUTOBLOK', 'Soco System', 'Sodeca', 'SOEMER Messtechnik', 'SOGEVAC Vane Pump (brand of Leybold)', 'Soldo Controls', 'SOLEXY (SOLDO WIRELESS)', 'SOLO Swiss', 'Somai', 'Somas', 'Somatec', 'SOMIC Verpackungsmaschinen', 'Sommer & Strassburger', 'Sommer Automatic', 'Sondex (Brand of Danfoss)', 'SONTEC', 'Sontheimer', 'SONZOGNI CAMME', 'Sopra (SOCA Fluid)', 'SOR Inc', 'SOUTHCO', 'Sparkle Power Incorporated (SPI)', 'Specken Drumag (brand of Specken-DRUMAG)', 'Speedermotion', 'SPEEDYBLOCK', 'SPI Developments', 'Spieth-maschinenelemente', 'Spinea', 'Spörk-Antriebssysteme', 'SPRINT ELECTRIC', 'SPS Electronic', 'SR Drives (brand of NIDEC)', 'SSP Safety System Products', 'SSZ', 'Stabilus', 'Stafsjö', 'STAHLWILLE', 'Staiger', 'Standard Pump', 'STARLINE', 'Static / StopStatic', 'Staubli (STÄUBLI TEC-SYSTEMS)', 'Steamtech Steam Cleaning Evolution', 'Steinhauser Spezialmaschinen GmbH', 'Steitz Maschinenbau', 'STEMATIC Steuerungstechnik', 'Stemin Breitbach', 'STEMMER IMAGING', 'Stephenson Gobin (SG Transmission)', 'Steriline', 'STM industrial electronics', 'STM SPA', 'Stober Antriebstechnik', 'Stocchetta', 'STORK KWANT', 'STÖRK-TRONIC / STORK-TRONIC / STOERK-TRONIC', 'Stransky a Petrzik', 'STRAUB', 'Strautmann', 'STRECKER', 'STREICHER / SATVIA', 'Stromag (Brand of Altra Industrial Motion)', 'Strongbelt', 'STRÖTER-Antriebstechnik', 'STROTHMANN Machines & Handling (brand of Siempelkamp Group)', 'STS coupling', 'STS Instruments', 'Stucchi', 'STUVEX', 'Stüwe', 'SUCO', 'Sul Corte', 'Summit Electronics', 'Sumtak Encoder', 'Sun Hydraulics (brand of Helios Technologies)', 'SUN-Control-Analytik', 'Sunfab', 'Suntes', 'Suparator', 'SUPRABEAM', 'Sweco', 'Syneco', 'SYR', 'SysTec', 'Systech Illinois', 'System Plast (brand of Regal Beloit)', 'Systema spa'],
  'T': ['TAC', 'Telco Sensors', 'Takamisawa', 'Tamagawa', 'Tele Haase Steuergeräte', 'Telco', 'Telebyte', 'Tesch', 'Timm', 'TOKIMEC Traco', 'TR – Electronic', 'Turck', 'TWK – Elektronik', 'Tyco', 'TAE Antriebstechnik', 'Taisei Kogyo', 'TAKAMAZ Takamatsu Machinery', 'Takex', 'TAKTOMAT', 'TAMAGAWA', 'Tamel', 'Tandler', 'Tapflo', 'TB Wood\'s Incorporated (Brand of Altra Industrial Motion)', 'TBi Industries', 'TC Mess- und Regeltechnik / TC Direct', 'TE Connectivity', 'TEC Electric Motors', 'TECHNAI TEAM', 'Technolit', 'Technotrans', 'Tecnicapompe', 'TECNIMETAL', 'Tecniwell', 'TECNO RULLI', 'Tecnofluid', 'Tecnord', 'TECNORM', 'Tecnos G.A.', 'TECNOSPAN', 'Tecofi', 'Tecom', 'Tecsis (brand of WIKA)', 'tecsystem', 'Tedea-Huntleigh (brand of VPG Transducers)', 'TEE Electric Motors', 'TEHA', 'TEIKOKU', 'Tekawe', 'Tekno Stamap', 'Telco', 'Telcomec', 'Telegärtner', 'Telemecanique', 'Tellure Rota', 'Tempco', 'Temporiti', 'Tempress', 'Tercesa', 'Termics', 'TERMO-PRECYZJA', 'Thermik', 'THERMO ENGINEERING', 'Thermo Est', 'Thermo Sensor', 'Thermokon Sensortechnik', 'THERMOSALD (3E s.r.l.)', 'THERMOTEC ENGINEERING', 'THIES Armatur', 'Thies Clima', 'THK', 'Thomas Scientific', 'Tidland (brand of Maxcess)', 'Tildesign', 'Time Mark', 'Timmer', 'Timsa', 'TIPPER TIE (brand of JBT Corporation)', 'TIPPKEMPER / Matrix Elektronik', 'TKD KABEL', 'TM s.r.l.', 'TMCI PADOVAN', 'TOHTSU', 'TOLLOK (brand of Rexnord)', 'Tomoe Valve', 'TOOL-TEMP', 'Tosoku', 'TOSS', 'TOX PRESSOTECHNIK', 'TOYO TSUSHO / TOHTSU', 'TR-Electronic', 'TRAFAG sensors & controls', 'Trafomic', 'Trafomodern', 'Tramag Transformatorenfabrik', 'tramec', 'Transfluid', 'Transformator-Teknik', 'Transmag', 'TRANSOR FILTER', 'Trasformatori EL-TRA', 'Trasmil', 'TRAVAINI PUMPS', 'Trepko', 'Tri Tronics', 'Tribotec', 'TROAX', 'Trumeter', 'TRUSCO NAKAYAMA', 'TRW-Ehrenreich', 'TS ELINO', 'TS GiM', 'TS Schmid AutoVision', 'TS TestingService', 'TSI', 'TSUGAMI', 'Turck', 'Turian', 'TUTCO Heating Solutions', 'Twiflex (Brand of Altra Industrial Motion)'],
  'U': ['UNIOR', 'UFM - Universal Flow Monitors', 'Uson GmbH', 'UE Systems', 'UHING', 'UFI FILTER', 'Uitert', 'ULTRA POMPE', 'Ultrafilter', 'Ultravolt (brand of Advanced Energy)', 'UNI-AIR PNEUMATICS / CYLINDERS by Hypex', 'Uni-Valve', 'UNIBAL (brand of RBC Bearings)', 'Unifil AG Filtertechnik', 'Unifill', 'Unifiller', 'UNIOELER', 'UnionChemnitz Werkzeugmaschinen (part of HerkulesGroup)', 'Unitech', 'UNITERM s.r.l.', 'Unitex Seil-Baur', 'Unitronic', 'Univer', 'UNIVERSAL HYDRAULIK', 'USV Systeme', 'UTP', 'UWT Level Control'],
  'V': ['Vaisala', 'Vishay', 'Vermes', 'VEGA Grieshaber KG', 'Vacohub Lubas', 'Vicor Corporation', 'VACOM', 'VACUUMSCHMELZE', 'Vadsbo', 'VAF', 'VAKOMA Industries', 'VAKUUMTECHNIK', 'Valco Melton', 'VALSTEAM ADCA', 'Valter Segatrici', 'Valvaut', 'Valvole Hofmann by BONINO ENGINEERING', 'Van der Molen', 'VANESSA (brand of Emerson)', 'Varimex Valves', 'Varmec', 'Varvel', 'VBS', 'VC Convert', 'VC999 PACKAGING', 'VDE special product / v.d. Elsen', 'VEB Magdeburger Pumpenfabrik (brand of VAKOMA Industries)', 'VEFIM', 'VEM', 'VEMER', 'VENTAIX', 'VENTAPP (brand of Siempelkamp Group)', 'Venti-Oelde', 'Verder', 'Versa Matic Pumpen', 'Versa Valves', 'Verstegen Grijpers', 'Vesta Automation', 'VETAPHONE', 'Vexve', 'VIBRA FRANCE', 'VIBROS', 'VibroSystM', 'Vibrowest', 'Vicor Corporation', 'Victor Pumpen', 'Vimarc', 'Vimoter', 'VIS', 'VIS ConveyorBelts', 'Visam', 'Vishay', 'Vivoil / Vivolo Oleodinamica', 'Vivolo', 'VMI', 'Vogel', 'Vögtlin Instruments', 'Volkmann', 'Volz Luftfilter', 'VOMAT FILTERSYSTEME', 'VOSS Automotive / VOSS Fluid', 'Vossloh-Schwabe', 'Voswinkel', 'VP Machines SRL', 'VS Sensorik', 'VSE Volumentechnik / VSE Flow', 'Vulcan Technic', 'VUOTOTECNICA', 'VYC INDUSTRIAL', 'VYPRO'],
  'W': ['W.E.St.', 'Wagner Instruments', 'WACHENDORFF', 'Wagener Schwelm', 'Waircom', 'Wagner', 'Waldmann', 'Waldner', 'WaldrichSiegen (part of HerkulesGroup)', 'Walter Tools', 'Walter Voss', 'WALTERWERK', 'Walther Praezision', 'WALTON', 'Walvoil', 'Wamco, Inc.', 'WAMEL', 'Wandfluh', 'Wangen Pumpen', 'WAREX Valve', 'Warner Electric', 'Wassmer Spezialmaschinen', 'Waterleau', 'Watford Control Instruments', 'Waveshare', 'WayCon', 'WC Branham', 'WEBER Schraubautomaten', 'Weber Sensors', 'WEBER-HYDRAULIK', 'Webex (brand of Maxcess)', 'WEBOMATIC', 'Webtec (Hydraulic measurement and control)', 'Weco', 'WEDECO', 'Weforma Dämpfungstechnik', 'WEH', 'Weigel Meßgeräte', 'WEIMA', 'Weinreich', 'Weintek', 'Weitkowitz', 'WEKA AG', 'WELDOTHERM', 'WELOTEC', 'WEMARO TOOLS', 'Wenglor', 'WERA TOOLS', 'Werma', 'Werne & Thiel sensortechnic', 'Werner Elektrotechnik', 'Werner Hansen', 'Wertli', 'WEST Control Solutions / Instruments', 'Westelettric', 'WESTLOCK Controls', 'WF-Messtechnik', 'WFL Millturn', 'Wichita Clutch (brand of Altra Industrial Motion)', 'widoberg', 'Wiedemann-Technik', 'Wilcoxon', 'WILDEN (Brand of DOVER)', 'Wilkerson', 'Willbrandt', 'WILO', 'Wilspec', 'Windmöller & Hölscher', 'Winkel Bearings', 'Winner Hydraulics', 'Wippermann', 'Wisdom Audio', 'WISTRO', 'WITTENSTEIN Alpha', 'WITTMANN BATTENFELD / Wittmann Robot', 'Wittmann Werkzeuge', 'WIWA', 'WME Power Systems', 'WMU', 'Wobit', 'Wöhrle Stromversorgungssysteme / Woehrle', 'WÖHWA', 'Wolfangel (brand of Siempelkamp Group)', 'Wolftechnik', 'Wollin', 'Worcester (brand of FLOWSERVE)', 'Wouter Witzel (brand of AVK Group)', 'WP ARO', 'WTA (brand of CRANE)', 'Wabco', 'Wabio', 'Wachendorff', 'WAGO', 'Water King', 'Wattlow', 'Werma', 'Weidmuelier', 'WEG', 'Wenglor', 'WIKA', 'Wintek', 'WinPaso', 'Wonderware', 'Winter Pumpen GmbH'],
  'X': ['Xilinx Corporation', 'Xylum', 'xecro', 'Xucla'],
  'Y': ['Yanmar', 'Yuasa Battery', 'Yokogawa', 'York Pneumatic & Hydraulic', 'Yuken', 'YPC Pneumatic (Yonwoo)'],
  'Z': ['Zettler', 'ZABI', 'Ziehl', 'Ziehl Abegg', 'ZAE-AntriebsSysteme', 'ZPA Ekoreg', 'Zambelli Enotech', 'Zanasi', 'Zander Aachen', 'Zanni', 'Zarges', 'Zator', 'ZD-MOTOR', 'ZDS Pump', 'Zebra Technologies', 'ZED / Ziegler Electronic Devices', 'ZEN', 'Zenit Pumps', 'ZETASASSI', 'ZEZ Silko', 'Ziehl industrie-elektronik', 'ZIEMANN', 'Zimm Maschinenelemente', 'Zimmer', 'Zimmer Automation', 'Zollern', 'ZÖLLNER Signal GmbH', 'ZOOK', 'Zoppas Industries', 'Zorzini', 'Zumbach Electronic', 'Zyklomat'],
  '#': ['1-CUBE', '3M', '3S Systemtechnik', '4B Braime', '5 Star Epoxy Grouts (Five Star® Precision Epoxy Grouts)', '7Ocean Hydraulics / SEVEN OCEAN HYDRAULICS'],
};

const handleBrandFilter = (letter) => {
  const brandFilterBtns = document.querySelectorAll('.brand-filter-btn');
  const brandsContent = document.getElementById('brands-content');
  
  console.log('handleBrandFilter called with letter:', letter);
  console.log('brandsContent element:', brandsContent);
  
  if (!brandsContent) {
    console.error('Brands content element not found');
    return;
  }
  
  // Update active button state
  brandFilterBtns.forEach(btn => {
    btn.classList.remove('active', 'bg-brandPurple', 'text-white');
    btn.classList.add('bg-gray-100', 'text-gray-700');
  });
  
  const activeBtn = document.querySelector(`[data-letter="${letter}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-brandPurple', 'text-white');
    activeBtn.classList.remove('bg-gray-100', 'text-gray-700');
  }

  // Display brands for selected letter with Show More functionality
  if (brandsData[letter]) {
    const brands = brandsData[letter];
    const initialShowCount = 70; // Show first 70 brands initially for balanced page coverage
    const hasMoreBrands = brands.length > initialShowCount;
    
    // Create all brands HTML in one continuous grid
    let allBrandsHTML = '';
    
    // First 70 brands (always visible)
    const initialBrands = brands.slice(0, initialShowCount);
    allBrandsHTML += initialBrands.map(brand => `
      <div class="text-brandNavy text-sm font-medium hover:text-brandPurple hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-100 hover:shadow-md rounded-lg px-3 py-2 transition-all duration-300 cursor-pointer">
        ${brand}
      </div>
    `).join('');
    
    // Remaining brands (hidden initially) - NO wrapper div to maintain grid flow
    if (hasMoreBrands) {
      const remainingBrands = brands.slice(initialShowCount);
      allBrandsHTML += remainingBrands.map(brand => `
        <div class="text-brandNavy text-sm font-medium hover:text-brandPurple hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-100 hover:shadow-md rounded-lg px-3 py-2 transition-all duration-300 cursor-pointer hidden" data-hidden-brand="true">
          ${brand}
        </div>
      `).join('');
    }
    
    // Add the View All button
    let buttonHTML = '';
    if (hasMoreBrands) {
      buttonHTML = `
        <div class="col-span-full">
          <div class="pt-4">
            <button 
              id="expand-btn-${letter}" 
              class="group flex items-center justify-center text-brandPurple hover:text-brandPurple/80 transition-all duration-500 w-20 h-16 rounded-full hover:bg-purple-50 hover:shadow-lg mx-auto animate-pulse"
              data-letter="${letter}"
              data-expanded="false"
              style="opacity: 0.7; transform: translateY(10px);"
              aria-label="Toggle brands view"
            >
              <svg class="w-8 h-8 transform transition-all duration-500 group-hover:scale-125 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    }
    
    // Combine everything
    const finalHTML = allBrandsHTML + buttonHTML;
    
    console.log('Generated HTML with expandable section:', finalHTML);
    brandsContent.innerHTML = finalHTML;
    console.log(`Displaying ${initialShowCount} of ${brands.length} brands for letter ${letter}`);
    
    // Add event listener to expand button
    if (hasMoreBrands) {
      const expandBtn = document.getElementById(`expand-btn-${letter}`);
      if (expandBtn) {
        expandBtn.addEventListener('click', handleExpand);
      }
    }
  } else {
    console.error('No brands data found for letter:', letter);
  }
};

// Handle expand button click
const handleExpand = (event) => {
  const button = event.target.closest('button'); // Get the button element
  const letter = button.getAttribute('data-letter');
  const isExpanded = button.getAttribute('data-expanded') === 'true';
  const hiddenBrandElements = document.querySelectorAll(`[data-hidden-brand="true"]`);
  const arrowIcon = button.querySelector('svg');
  
  if (hiddenBrandElements.length === 0) return;
  
  if (isExpanded) {
    // Collapse: hide brands and rotate arrow back
    hiddenBrandElements.forEach(element => {
      element.classList.add('hidden');
    });
    arrowIcon.style.transform = 'rotate(0deg)';
    button.setAttribute('data-expanded', 'false');
  } else {
    // Expand: show brands and rotate arrow down
    hiddenBrandElements.forEach(element => {
      element.classList.remove('hidden');
    });
    arrowIcon.style.transform = 'rotate(180deg)';
    button.setAttribute('data-expanded', 'true');
  }
};

// Handle search expand button click
const handleSearchExpand = (event) => {
  const button = event.target.closest('button'); // Get the button element
  const isExpanded = button.getAttribute('data-expanded') === 'true';
  const hiddenSearchSection = document.getElementById('hidden-search-results');
  const arrowIcon = button.querySelector('svg');
  
  if (!hiddenSearchSection) return;
  
  if (isExpanded) {
    // Collapse: hide results and rotate arrow back, move button back to middle
    hiddenSearchSection.classList.add('hidden');
    arrowIcon.style.transform = 'rotate(0deg)';
    button.setAttribute('data-expanded', 'false');
    button.querySelector('span').textContent = `View All`;
    

  } else {
    // Expand: show results and rotate arrow down
    hiddenSearchSection.classList.remove('hidden');
    arrowIcon.style.transform = 'rotate(180deg)';
    button.setAttribute('data-expanded', 'true');
    button.querySelector('span').textContent = `Hide Results`;
  }
};

// Initialize brands section with letter A active by default
const initializeBrands = () => {
  console.log('=== INITIALIZING BRANDS SECTION ===');
  console.log('brandsData for A:', brandsData['A']);
  console.log('Number of brands in A:', brandsData['A'].length);
  
  const brandFilterBtns = document.querySelectorAll('.brand-filter-btn');
  const brandsContent = document.getElementById('brands-content');
  
  console.log('Found brand filter buttons:', brandFilterBtns.length);
  console.log('Found brands content element:', brandsContent);
  console.log('brandsData keys:', Object.keys(brandsData));
  
  if (brandFilterBtns.length > 0 && brandsContent) {
    console.log('All required elements found, proceeding...');
    
    // Set initial active state for letter A
    const letterABtn = document.querySelector('[data-letter="A"]');
    if (letterABtn) {
      letterABtn.classList.add('active', 'bg-brandPurple', 'text-white');
      letterABtn.classList.remove('bg-gray-100', 'text-gray-700');
      console.log('Set letter A as active');
    }
    
    // Show brands for letter A by default
    console.log('Calling handleBrandFilter("A")...');
    handleBrandFilter('A');
  } else {
    console.error('Required elements not found for brands section');
    console.error('brandFilterBtns.length:', brandFilterBtns.length);
    console.error('brandsContent:', brandsContent);
  }
};

// Initialize brands section when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBrands);

// Add scroll detection for View All button visibility
let scrollTimeout;
document.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const expandButtons = document.querySelectorAll('[id^="expand-btn-"], #expand-search-btn');
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    expandButtons.forEach(button => {
      const buttonRect = button.getBoundingClientRect();
      const isVisible = buttonRect.top < windowHeight && buttonRect.bottom > 0;
      
      if (isVisible && scrollY > 100) { // Show button when scrolled down more than 100px
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      } else if (scrollY <= 100) {
        button.style.opacity = '0.7';
        button.style.transform = 'translateY(10px)';
      }
    });
  }, 100);
});

// Also add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure DOM is fully ready
  setTimeout(() => {
    const brandFilterBtns = document.querySelectorAll('.brand-filter-btn');
    const searchInput = document.getElementById('brand-search');
    
    console.log('DOM loaded, looking for elements:');
    console.log('Search input:', searchInput);
    console.log('Brand filter buttons:', brandFilterBtns.length);
  
  // Search functionality
  if (searchInput) {
    console.log('Search input found, adding event listener');
    searchInput.addEventListener('input', (e) => {
      console.log('Search input event triggered:', e.target.value);
      const searchTerm = e.target.value.toLowerCase().trim();
      console.log('Search term:', searchTerm);
      
      if (searchTerm === '') {
        // If search is empty, show default letter A
        console.log('Search empty, showing letter A');
        handleBrandFilter('A');
        return;
      }
      
      // Search through all brands
      const allBrands = [];
      Object.keys(brandsData).forEach(letter => {
        brandsData[letter].forEach(brand => {
          if (brand.toLowerCase().includes(searchTerm)) {
            allBrands.push(brand);
          }
        });
      });
      
      console.log('Found brands:', allBrands.length);
      
      // Display search results with Show More functionality
      const brandsContent = document.getElementById('brands-content');
      if (brandsContent) {
        if (allBrands.length > 0) {
          const initialShowCount = 70; // Show first 70 search results initially for balanced page coverage
          const hasMoreResults = allBrands.length > initialShowCount;
          
          // Show initial search results
          const initialResults = allBrands.slice(0, initialShowCount);
          const brandsHTML = initialResults.map(brand => `
            <div class="text-brandNavy text-sm font-medium hover:text-brandPurple hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-100 hover:shadow-md rounded-lg px-3 py-2 transition-all duration-300 cursor-pointer">
              ${brand}
            </div>
          `).join('');
          
          // Create expandable section for remaining search results
          let expandableSearchHTML = '';
          if (hasMoreResults) {
            const remainingCount = allBrands.length - initialShowCount;
            const remainingResults = allBrands.slice(initialShowCount);
            
            expandableSearchHTML = `
              <div class="col-span-full">
                <!-- Expandable Section for Search -->
                <div class="border-t border-gray-200 pt-4">
                                     <button 
                     id="expand-search-btn" 
                     class="group flex items-center justify-center gap-2 text-brandPurple hover:text-brandPurple/80 font-medium transition-all duration-500 w-full py-3 rounded-lg hover:bg-purple-50"
                     data-expanded="false"
                     style="opacity: 0.7; transform: translateY(10px);"
                   >
                    <span>View All</span>
                    <svg class="w-5 h-5 transform transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  
                  <!-- Hidden search results section - integrated into the same grid -->
                  <div id="hidden-search-results" class="hidden">
                    ${remainingResults.map(brand => `
                      <div class="text-brandNavy text-sm font-medium hover:text-brandPurple hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-100 hover:shadow-md rounded-lg px-3 py-2 transition-all duration-300 cursor-pointer">
                        ${brand}
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `;
          }
          
          brandsContent.innerHTML = brandsHTML + expandableSearchHTML;
          
          // Add event listener to search expand button
          if (hasMoreResults) {
            const expandSearchBtn = document.getElementById('expand-search-btn');
            if (expandSearchBtn) {
              expandSearchBtn.addEventListener('click', handleSearchExpand);
            }
          }
          
          console.log('Updated brands content with search results');
        } else {
          brandsContent.innerHTML = '<div class="text-gray-500 text-center col-span-full py-8">No brands found matching your search.</div>';
          console.log('No brands found, showing message');
        }
      } else {
        console.error('Brands content element not found during search');
      }
      
      // Update button states - remove active state from all buttons
      brandFilterBtns.forEach(btn => {
        btn.classList.remove('active', 'bg-brandPurple', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
      });
    });
  } else {
    console.error('Search input element not found');
  }
  
  brandFilterBtns.forEach(btn => {
    // Show brands on hover
    btn.addEventListener('mouseenter', () => {
      const letter = btn.getAttribute('data-letter');
      if (letter) {
        console.log('Hovered over letter:', letter);
        handleBrandFilter(letter);
      }
    });
    
    // Keep click functionality as backup
    btn.addEventListener('click', () => {
      const letter = btn.getAttribute('data-letter');
      if (letter) {
        console.log('Clicked letter:', letter);
        handleBrandFilter(letter);
      }
    });
  });
  }, 100); // 100ms delay
});

// Try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  console.log('DOM still loading, waiting for DOMContentLoaded...');
} else {
  console.log('DOM already loaded, initializing immediately...');
  initializeBrands();
}



