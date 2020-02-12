// @ts-check
// Lists of countries with ISO 3166 codes, presented in various formats.
// Last Updated: Nov 15, 2019

// If you're using PHP, I suggest checking out:
// https://github.com/thephpleague/iso3166
//
// JS developers can check out:
// https://www.npmjs.com/package/iso3166-2-db

// List of all countries in a simple list / array.
export const countryList = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan (Province of China)",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"United States of America (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];

// Country names object using 2-letter country codes to reference country name
// ISO 3166 Alpha-2 Format: [2 letter Country Code]: [Country Name]
// Alphabetical by Country Name
export const countryListAlpha2 = {
	AF: "Afghanistan",
	AL: "Albania",
	DZ: "Algeria",
	AS: "American Samoa",
	AD: "Andorra",
	AO: "Angola",
	AI: "Anguilla",
	AQ: "Antarctica",
	AG: "Antigua and Barbuda",
	AR: "Argentina",
	AM: "Armenia",
	AW: "Aruba",
	AU: "Australia",
	AT: "Austria",
	AZ: "Azerbaijan",
	BS: "Bahamas (the)",
	BH: "Bahrain",
	BD: "Bangladesh",
	BB: "Barbados",
	BY: "Belarus",
	BE: "Belgium",
	BZ: "Belize",
	BJ: "Benin",
	BM: "Bermuda",
	BT: "Bhutan",
	BO: "Bolivia (Plurinational State of)",
	BQ: "Bonaire, Sint Eustatius and Saba",
	BA: "Bosnia and Herzegovina",
	BW: "Botswana",
	BV: "Bouvet Island",
	BR: "Brazil",
	IO: "British Indian Ocean Territory (the)",
	BN: "Brunei Darussalam",
	BG: "Bulgaria",
	BF: "Burkina Faso",
	BI: "Burundi",
	CV: "Cabo Verde",
	KH: "Cambodia",
	CM: "Cameroon",
	CA: "Canada",
	KY: "Cayman Islands (the)",
	CF: "Central African Republic (the)",
	TD: "Chad",
	CL: "Chile",
	CN: "China",
	CX: "Christmas Island",
	CC: "Cocos (Keeling) Islands (the)",
	CO: "Colombia",
	KM: "Comoros (the)",
	CD: "Congo (the Democratic Republic of the)",
	CG: "Congo (the)",
	CK: "Cook Islands (the)",
	CR: "Costa Rica",
	HR: "Croatia",
	CU: "Cuba",
	CW: "Curaçao",
	CY: "Cyprus",
	CZ: "Czechia",
	CI: "Côte d'Ivoire",
	DK: "Denmark",
	DJ: "Djibouti",
	DM: "Dominica",
	DO: "Dominican Republic (the)",
	EC: "Ecuador",
	EG: "Egypt",
	SV: "El Salvador",
	GQ: "Equatorial Guinea",
	ER: "Eritrea",
	EE: "Estonia",
	SZ: "Eswatini",
	ET: "Ethiopia",
	FK: "Falkland Islands (the) [Malvinas]",
	FO: "Faroe Islands (the)",
	FJ: "Fiji",
	FI: "Finland",
	FR: "France",
	GF: "French Guiana",
	PF: "French Polynesia",
	TF: "French Southern Territories (the)",
	GA: "Gabon",
	GM: "Gambia (the)",
	GE: "Georgia",
	DE: "Germany",
	GH: "Ghana",
	GI: "Gibraltar",
	GR: "Greece",
	GL: "Greenland",
	GD: "Grenada",
	GP: "Guadeloupe",
	GU: "Guam",
	GT: "Guatemala",
	GG: "Guernsey",
	GN: "Guinea",
	GW: "Guinea-Bissau",
	GY: "Guyana",
	HT: "Haiti",
	HM: "Heard Island and McDonald Islands",
	VA: "Holy See (the)",
	HN: "Honduras",
	HK: "Hong Kong",
	HU: "Hungary",
	IS: "Iceland",
	IN: "India",
	ID: "Indonesia",
	IR: "Iran (Islamic Republic of)",
	IQ: "Iraq",
	IE: "Ireland",
	IM: "Isle of Man",
	IL: "Israel",
	IT: "Italy",
	JM: "Jamaica",
	JP: "Japan",
	JE: "Jersey",
	JO: "Jordan",
	KZ: "Kazakhstan",
	KE: "Kenya",
	KI: "Kiribati",
	KP: "Korea (the Democratic People's Republic of)",
	KR: "Korea (the Republic of)",
	KW: "Kuwait",
	KG: "Kyrgyzstan",
	LA: "Lao People's Democratic Republic (the)",
	LV: "Latvia",
	LB: "Lebanon",
	LS: "Lesotho",
	LR: "Liberia",
	LY: "Libya",
	LI: "Liechtenstein",
	LT: "Lithuania",
	LU: "Luxembourg",
	MO: "Macao",
	MG: "Madagascar",
	MW: "Malawi",
	MY: "Malaysia",
	MV: "Maldives",
	ML: "Mali",
	MT: "Malta",
	MH: "Marshall Islands (the)",
	MQ: "Martinique",
	MR: "Mauritania",
	MU: "Mauritius",
	YT: "Mayotte",
	MX: "Mexico",
	FM: "Micronesia (Federated States of)",
	MD: "Moldova (the Republic of)",
	MC: "Monaco",
	MN: "Mongolia",
	ME: "Montenegro",
	MS: "Montserrat",
	MA: "Morocco",
	MZ: "Mozambique",
	MM: "Myanmar",
	NA: "Namibia",
	NR: "Nauru",
	NP: "Nepal",
	NL: "Netherlands (the)",
	NC: "New Caledonia",
	NZ: "New Zealand",
	NI: "Nicaragua",
	NE: "Niger (the)",
	NG: "Nigeria",
	NU: "Niue",
	NF: "Norfolk Island",
	MP: "Northern Mariana Islands (the)",
	NO: "Norway",
	OM: "Oman",
	PK: "Pakistan",
	PW: "Palau",
	PS: "Palestine, State of",
	PA: "Panama",
	PG: "Papua New Guinea",
	PY: "Paraguay",
	PE: "Peru",
	PH: "Philippines (the)",
	PN: "Pitcairn",
	PL: "Poland",
	PT: "Portugal",
	PR: "Puerto Rico",
	QA: "Qatar",
	MK: "Republic of North Macedonia",
	RO: "Romania",
	RU: "Russian Federation (the)",
	RW: "Rwanda",
	RE: "Réunion",
	BL: "Saint Barthélemy",
	SH: "Saint Helena, Ascension and Tristan da Cunha",
	KN: "Saint Kitts and Nevis",
	LC: "Saint Lucia",
	MF: "Saint Martin (French part)",
	PM: "Saint Pierre and Miquelon",
	VC: "Saint Vincent and the Grenadines",
	WS: "Samoa",
	SM: "San Marino",
	ST: "Sao Tome and Principe",
	SA: "Saudi Arabia",
	SN: "Senegal",
	RS: "Serbia",
	SC: "Seychelles",
	SL: "Sierra Leone",
	SG: "Singapore",
	SX: "Sint Maarten (Dutch part)",
	SK: "Slovakia",
	SI: "Slovenia",
	SB: "Solomon Islands",
	SO: "Somalia",
	ZA: "South Africa",
	GS: "South Georgia and the South Sandwich Islands",
	SS: "South Sudan",
	ES: "Spain",
	LK: "Sri Lanka",
	SD: "Sudan (the)",
	SR: "Suriname",
	SJ: "Svalbard and Jan Mayen",
	SE: "Sweden",
	CH: "Switzerland",
	SY: "Syrian Arab Republic",
	TW: "Taiwan (Province of China)",
	TJ: "Tajikistan",
	TZ: "Tanzania, United Republic of",
	TH: "Thailand",
	TL: "Timor-Leste",
	TG: "Togo",
	TK: "Tokelau",
	TO: "Tonga",
	TT: "Trinidad and Tobago",
	TN: "Tunisia",
	TR: "Turkey",
	TM: "Turkmenistan",
	TC: "Turks and Caicos Islands (the)",
	TV: "Tuvalu",
	UG: "Uganda",
	UA: "Ukraine",
	AE: "United Arab Emirates (the)",
	GB: "United Kingdom of Great Britain and Northern Ireland (the)",
	UM: "United States Minor Outlying Islands (the)",
	US: "United States of America (the)",
	UY: "Uruguay",
	UZ: "Uzbekistan",
	VU: "Vanuatu",
	VE: "Venezuela (Bolivarian Republic of)",
	VN: "Viet Nam",
	VG: "Virgin Islands (British)",
	VI: "Virgin Islands (U.S.)",
	WF: "Wallis and Futuna",
	EH: "Western Sahara",
	YE: "Yemen",
	ZM: "Zambia",
	ZW: "Zimbabwe",
	AX: "Åland Islands"
};

// Country names object using 3-letter country codes to reference country name
// ISO 3166 Alpha-3 Format: [3 letter Country Code]: [Country Name]
// Alphabetical by Country Name
export const countryListAlpha3 = {
	AFG: "Afghanistan",
	ALB: "Albania",
	DZA: "Algeria",
	ASM: "American Samoa",
	AND: "Andorra",
	AGO: "Angola",
	AIA: "Anguilla",
	ATA: "Antarctica",
	ATG: "Antigua and Barbuda",
	ARG: "Argentina",
	ARM: "Armenia",
	ABW: "Aruba",
	AUS: "Australia",
	AUT: "Austria",
	AZE: "Azerbaijan",
	BHS: "Bahamas (the)",
	BHR: "Bahrain",
	BGD: "Bangladesh",
	BRB: "Barbados",
	BLR: "Belarus",
	BEL: "Belgium",
	BLZ: "Belize",
	BEN: "Benin",
	BMU: "Bermuda",
	BTN: "Bhutan",
	BOL: "Bolivia (Plurinational State of)",
	BES: "Bonaire, Sint Eustatius and Saba",
	BIH: "Bosnia and Herzegovina",
	BWA: "Botswana",
	BVT: "Bouvet Island",
	BRA: "Brazil",
	IOT: "British Indian Ocean Territory (the)",
	BRN: "Brunei Darussalam",
	BGR: "Bulgaria",
	BFA: "Burkina Faso",
	BDI: "Burundi",
	CPV: "Cabo Verde",
	KHM: "Cambodia",
	CMR: "Cameroon",
	CAN: "Canada",
	CYM: "Cayman Islands (the)",
	CAF: "Central African Republic (the)",
	TCD: "Chad",
	CHL: "Chile",
	CHN: "China",
	CXR: "Christmas Island",
	CCK: "Cocos (Keeling) Islands (the)",
	COL: "Colombia",
	COM: "Comoros (the)",
	COD: "Congo (the Democratic Republic of the)",
	COG: "Congo (the)",
	COK: "Cook Islands (the)",
	CRI: "Costa Rica",
	HRV: "Croatia",
	CUB: "Cuba",
	CUW: "Curaçao",
	CYP: "Cyprus",
	CZE: "Czechia",
	CIV: "Côte d'Ivoire",
	DNK: "Denmark",
	DJI: "Djibouti",
	DMA: "Dominica",
	DOM: "Dominican Republic (the)",
	ECU: "Ecuador",
	EGY: "Egypt",
	SLV: "El Salvador",
	GNQ: "Equatorial Guinea",
	ERI: "Eritrea",
	EST: "Estonia",
	SWZ: "Eswatini",
	ETH: "Ethiopia",
	FLK: "Falkland Islands (the) [Malvinas]",
	FRO: "Faroe Islands (the)",
	FJI: "Fiji",
	FIN: "Finland",
	FRA: "France",
	GUF: "French Guiana",
	PYF: "French Polynesia",
	ATF: "French Southern Territories (the)",
	GAB: "Gabon",
	GMB: "Gambia (the)",
	GEO: "Georgia",
	DEU: "Germany",
	GHA: "Ghana",
	GIB: "Gibraltar",
	GRC: "Greece",
	GRL: "Greenland",
	GRD: "Grenada",
	GLP: "Guadeloupe",
	GUM: "Guam",
	GTM: "Guatemala",
	GGY: "Guernsey",
	GIN: "Guinea",
	GNB: "Guinea-Bissau",
	GUY: "Guyana",
	HTI: "Haiti",
	HMD: "Heard Island and McDonald Islands",
	VAT: "Holy See (the)",
	HND: "Honduras",
	HKG: "Hong Kong",
	HUN: "Hungary",
	ISL: "Iceland",
	IND: "India",
	IDN: "Indonesia",
	IRN: "Iran (Islamic Republic of)",
	IRQ: "Iraq",
	IRL: "Ireland",
	IMN: "Isle of Man",
	ISR: "Israel",
	ITA: "Italy",
	JAM: "Jamaica",
	JPN: "Japan",
	JEY: "Jersey",
	JOR: "Jordan",
	KAZ: "Kazakhstan",
	KEN: "Kenya",
	KIR: "Kiribati",
	PRK: "Korea (the Democratic People's Republic of)",
	KOR: "Korea (the Republic of)",
	KWT: "Kuwait",
	KGZ: "Kyrgyzstan",
	LAO: "Lao People's Democratic Republic (the)",
	LVA: "Latvia",
	LBN: "Lebanon",
	LSO: "Lesotho",
	LBR: "Liberia",
	LBY: "Libya",
	LIE: "Liechtenstein",
	LTU: "Lithuania",
	LUX: "Luxembourg",
	MAC: "Macao",
	MDG: "Madagascar",
	MWI: "Malawi",
	MYS: "Malaysia",
	MDV: "Maldives",
	MLI: "Mali",
	MLT: "Malta",
	MHL: "Marshall Islands (the)",
	MTQ: "Martinique",
	MRT: "Mauritania",
	MUS: "Mauritius",
	MYT: "Mayotte",
	MEX: "Mexico",
	FSM: "Micronesia (Federated States of)",
	MDA: "Moldova (the Republic of)",
	MCO: "Monaco",
	MNG: "Mongolia",
	MNE: "Montenegro",
	MSR: "Montserrat",
	MAR: "Morocco",
	MOZ: "Mozambique",
	MMR: "Myanmar",
	NAM: "Namibia",
	NRU: "Nauru",
	NPL: "Nepal",
	NLD: "Netherlands (the)",
	NCL: "New Caledonia",
	NZL: "New Zealand",
	NIC: "Nicaragua",
	NER: "Niger (the)",
	NGA: "Nigeria",
	NIU: "Niue",
	NFK: "Norfolk Island",
	MNP: "Northern Mariana Islands (the)",
	NOR: "Norway",
	OMN: "Oman",
	PAK: "Pakistan",
	PLW: "Palau",
	PSE: "Palestine, State of",
	PAN: "Panama",
	PNG: "Papua New Guinea",
	PRY: "Paraguay",
	PER: "Peru",
	PHL: "Philippines (the)",
	PCN: "Pitcairn",
	POL: "Poland",
	PRT: "Portugal",
	PRI: "Puerto Rico",
	QAT: "Qatar",
	MKD: "Republic of North Macedonia",
	ROU: "Romania",
	RUS: "Russian Federation (the)",
	RWA: "Rwanda",
	REU: "Réunion",
	BLM: "Saint Barthélemy",
	SHN: "Saint Helena, Ascension and Tristan da Cunha",
	KNA: "Saint Kitts and Nevis",
	LCA: "Saint Lucia",
	MAF: "Saint Martin (French part)",
	SPM: "Saint Pierre and Miquelon",
	VCT: "Saint Vincent and the Grenadines",
	WSM: "Samoa",
	SMR: "San Marino",
	STP: "Sao Tome and Principe",
	SAU: "Saudi Arabia",
	SEN: "Senegal",
	SRB: "Serbia",
	SYC: "Seychelles",
	SLE: "Sierra Leone",
	SGP: "Singapore",
	SXM: "Sint Maarten (Dutch part)",
	SVK: "Slovakia",
	SVN: "Slovenia",
	SLB: "Solomon Islands",
	SOM: "Somalia",
	ZAF: "South Africa",
	SGS: "South Georgia and the South Sandwich Islands",
	SSD: "South Sudan",
	ESP: "Spain",
	LKA: "Sri Lanka",
	SDN: "Sudan (the)",
	SUR: "Suriname",
	SJM: "Svalbard and Jan Mayen",
	SWE: "Sweden",
	CHE: "Switzerland",
	SYR: "Syrian Arab Republic",
	TWN: "Taiwan (Province of China)",
	TJK: "Tajikistan",
	TZA: "Tanzania, United Republic of",
	THA: "Thailand",
	TLS: "Timor-Leste",
	TGO: "Togo",
	TKL: "Tokelau",
	TON: "Tonga",
	TTO: "Trinidad and Tobago",
	TUN: "Tunisia",
	TUR: "Turkey",
	TKM: "Turkmenistan",
	TCA: "Turks and Caicos Islands (the)",
	TUV: "Tuvalu",
	UGA: "Uganda",
	UKR: "Ukraine",
	ARE: "United Arab Emirates (the)",
	GBR: "United Kingdom of Great Britain and Northern Ireland (the)",
	UMI: "United States Minor Outlying Islands (the)",
	USA: "United States of America (the)",
	URY: "Uruguay",
	UZB: "Uzbekistan",
	VUT: "Vanuatu",
	VEN: "Venezuela (Bolivarian Republic of)",
	VNM: "Viet Nam",
	VGB: "Virgin Islands (British)",
	VIR: "Virgin Islands (U.S.)",
	WLF: "Wallis and Futuna",
	ESH: "Western Sahara",
	YEM: "Yemen",
	ZMB: "Zambia",
	ZWE: "Zimbabwe",
	ALA: "Åland Islands"
};

// Country names object using numeric country codes to reference country name
// ISO 3166 Numberic Format: [Numeric Country Code]: [Country Name]
// Alphabetical by Country Name
export const countryListNumeric = {
	"004": "Afghanistan",
	"008": "Albania",
	"012": "Algeria",
	"016": "American Samoa",
	"020": "Andorra",
	"024": "Angola",
	"660": "Anguilla",
	"010": "Antarctica",
	"028": "Antigua and Barbuda",
	"032": "Argentina",
	"051": "Armenia",
	"533": "Aruba",
	"036": "Australia",
	"040": "Austria",
	"031": "Azerbaijan",
	"044": "Bahamas (the)",
	"048": "Bahrain",
	"050": "Bangladesh",
	"052": "Barbados",
	"112": "Belarus",
	"056": "Belgium",
	"084": "Belize",
	"204": "Benin",
	"060": "Bermuda",
	"064": "Bhutan",
	"068": "Bolivia (Plurinational State of)",
	"535": "Bonaire, Sint Eustatius and Saba",
	"070": "Bosnia and Herzegovina",
	"072": "Botswana",
	"074": "Bouvet Island",
	"076": "Brazil",
	"086": "British Indian Ocean Territory (the)",
	"096": "Brunei Darussalam",
	"100": "Bulgaria",
	"854": "Burkina Faso",
	"108": "Burundi",
	"132": "Cabo Verde",
	"116": "Cambodia",
	"120": "Cameroon",
	"124": "Canada",
	"136": "Cayman Islands (the)",
	"140": "Central African Republic (the)",
	"148": "Chad",
	"152": "Chile",
	"156": "China",
	"162": "Christmas Island",
	"166": "Cocos (Keeling) Islands (the)",
	"170": "Colombia",
	"174": "Comoros (the)",
	"180": "Congo (the Democratic Republic of the)",
	"178": "Congo (the)",
	"184": "Cook Islands (the)",
	"188": "Costa Rica",
	"191": "Croatia",
	"192": "Cuba",
	"531": "Curaçao",
	"196": "Cyprus",
	"203": "Czechia",
	"384": "Côte d'Ivoire",
	"208": "Denmark",
	"262": "Djibouti",
	"212": "Dominica",
	"214": "Dominican Republic (the)",
	"218": "Ecuador",
	"818": "Egypt",
	"222": "El Salvador",
	"226": "Equatorial Guinea",
	"232": "Eritrea",
	"233": "Estonia",
	"748": "Eswatini",
	"231": "Ethiopia",
	"238": "Falkland Islands (the) [Malvinas]",
	"234": "Faroe Islands (the)",
	"242": "Fiji",
	"246": "Finland",
	"250": "France",
	"254": "French Guiana",
	"258": "French Polynesia",
	"260": "French Southern Territories (the)",
	"266": "Gabon",
	"270": "Gambia (the)",
	"268": "Georgia",
	"276": "Germany",
	"288": "Ghana",
	"292": "Gibraltar",
	"300": "Greece",
	"304": "Greenland",
	"308": "Grenada",
	"312": "Guadeloupe",
	"316": "Guam",
	"320": "Guatemala",
	"831": "Guernsey",
	"324": "Guinea",
	"624": "Guinea-Bissau",
	"328": "Guyana",
	"332": "Haiti",
	"334": "Heard Island and McDonald Islands",
	"336": "Holy See (the)",
	"340": "Honduras",
	"344": "Hong Kong",
	"348": "Hungary",
	"352": "Iceland",
	"356": "India",
	"360": "Indonesia",
	"364": "Iran (Islamic Republic of)",
	"368": "Iraq",
	"372": "Ireland",
	"833": "Isle of Man",
	"376": "Israel",
	"380": "Italy",
	"388": "Jamaica",
	"392": "Japan",
	"832": "Jersey",
	"400": "Jordan",
	"398": "Kazakhstan",
	"404": "Kenya",
	"296": "Kiribati",
	"408": "Korea (the Democratic People's Republic of)",
	"410": "Korea (the Republic of)",
	"414": "Kuwait",
	"417": "Kyrgyzstan",
	"418": "Lao People's Democratic Republic (the)",
	"428": "Latvia",
	"422": "Lebanon",
	"426": "Lesotho",
	"430": "Liberia",
	"434": "Libya",
	"438": "Liechtenstein",
	"440": "Lithuania",
	"442": "Luxembourg",
	"446": "Macao",
	"450": "Madagascar",
	"454": "Malawi",
	"458": "Malaysia",
	"462": "Maldives",
	"466": "Mali",
	"470": "Malta",
	"584": "Marshall Islands (the)",
	"474": "Martinique",
	"478": "Mauritania",
	"480": "Mauritius",
	"175": "Mayotte",
	"484": "Mexico",
	"583": "Micronesia (Federated States of)",
	"498": "Moldova (the Republic of)",
	"492": "Monaco",
	"496": "Mongolia",
	"499": "Montenegro",
	"500": "Montserrat",
	"504": "Morocco",
	"508": "Mozambique",
	"104": "Myanmar",
	"516": "Namibia",
	"520": "Nauru",
	"524": "Nepal",
	"528": "Netherlands (the)",
	"540": "New Caledonia",
	"554": "New Zealand",
	"558": "Nicaragua",
	"562": "Niger (the)",
	"566": "Nigeria",
	"570": "Niue",
	"574": "Norfolk Island",
	"580": "Northern Mariana Islands (the)",
	"578": "Norway",
	"512": "Oman",
	"586": "Pakistan",
	"585": "Palau",
	"275": "Palestine, State of",
	"591": "Panama",
	"598": "Papua New Guinea",
	"600": "Paraguay",
	"604": "Peru",
	"608": "Philippines (the)",
	"612": "Pitcairn",
	"616": "Poland",
	"620": "Portugal",
	"630": "Puerto Rico",
	"634": "Qatar",
	"807": "Republic of North Macedonia",
	"642": "Romania",
	"643": "Russian Federation (the)",
	"646": "Rwanda",
	"638": "Réunion",
	"652": "Saint Barthélemy",
	"654": "Saint Helena, Ascension and Tristan da Cunha",
	"659": "Saint Kitts and Nevis",
	"662": "Saint Lucia",
	"663": "Saint Martin (French part)",
	"666": "Saint Pierre and Miquelon",
	"670": "Saint Vincent and the Grenadines",
	"882": "Samoa",
	"674": "San Marino",
	"678": "Sao Tome and Principe",
	"682": "Saudi Arabia",
	"686": "Senegal",
	"688": "Serbia",
	"690": "Seychelles",
	"694": "Sierra Leone",
	"702": "Singapore",
	"534": "Sint Maarten (Dutch part)",
	"703": "Slovakia",
	"705": "Slovenia",
	"090": "Solomon Islands",
	"706": "Somalia",
	"710": "South Africa",
	"239": "South Georgia and the South Sandwich Islands",
	"728": "South Sudan",
	"724": "Spain",
	"144": "Sri Lanka",
	"729": "Sudan (the)",
	"740": "Suriname",
	"744": "Svalbard and Jan Mayen",
	"752": "Sweden",
	"756": "Switzerland",
	"760": "Syrian Arab Republic",
	"158": "Taiwan (Province of China)",
	"762": "Tajikistan",
	"834": "Tanzania, United Republic of",
	"764": "Thailand",
	"626": "Timor-Leste",
	"768": "Togo",
	"772": "Tokelau",
	"776": "Tonga",
	"780": "Trinidad and Tobago",
	"788": "Tunisia",
	"792": "Turkey",
	"795": "Turkmenistan",
	"796": "Turks and Caicos Islands (the)",
	"798": "Tuvalu",
	"800": "Uganda",
	"804": "Ukraine",
	"784": "United Arab Emirates (the)",
	"826": "United Kingdom of Great Britain and Northern Ireland (the)",
	"581": "United States Minor Outlying Islands (the)",
	"840": "United States of America (the)",
	"858": "Uruguay",
	"860": "Uzbekistan",
	"548": "Vanuatu",
	"862": "Venezuela (Bolivarian Republic of)",
	"704": "Viet Nam",
	"092": "Virgin Islands (British)",
	"850": "Virgin Islands (U.S.)",
	"876": "Wallis and Futuna",
	"732": "Western Sahara",
	"887": "Yemen",
	"894": "Zambia",
	"716": "Zimbabwe",
	"248": "Åland Islands"
};

// Country names object using numeric country codes to reference country name
// ISO 3166 Numberic Format: [Numeric Country Code]: [Country Name]
// Alphabetical by Country Name
export const countryListAllIsoData = [
	{ code: "AF", code3: "AFG", name: "Afghanistan", number: "004" },
	{ code: "AL", code3: "ALB", name: "Albania", number: "008" },
	{ code: "DZ", code3: "DZA", name: "Algeria", number: "012" },
	{ code: "AS", code3: "ASM", name: "American Samoa", number: "016" },
	{ code: "AD", code3: "AND", name: "Andorra", number: "020" },
	{ code: "AO", code3: "AGO", name: "Angola", number: "024" },
	{ code: "AI", code3: "AIA", name: "Anguilla", number: "660" },
	{ code: "AQ", code3: "ATA", name: "Antarctica", number: "010" },
	{ code: "AG", code3: "ATG", name: "Antigua and Barbuda", number: "028" },
	{ code: "AR", code3: "ARG", name: "Argentina", number: "032" },
	{ code: "AM", code3: "ARM", name: "Armenia", number: "051" },
	{ code: "AW", code3: "ABW", name: "Aruba", number: "533" },
	{ code: "AU", code3: "AUS", name: "Australia", number: "036" },
	{ code: "AT", code3: "AUT", name: "Austria", number: "040" },
	{ code: "AZ", code3: "AZE", name: "Azerbaijan", number: "031" },
	{ code: "BS", code3: "BHS", name: "Bahamas (the)", number: "044" },
	{ code: "BH", code3: "BHR", name: "Bahrain", number: "048" },
	{ code: "BD", code3: "BGD", name: "Bangladesh", number: "050" },
	{ code: "BB", code3: "BRB", name: "Barbados", number: "052" },
	{ code: "BY", code3: "BLR", name: "Belarus", number: "112" },
	{ code: "BE", code3: "BEL", name: "Belgium", number: "056" },
	{ code: "BZ", code3: "BLZ", name: "Belize", number: "084" },
	{ code: "BJ", code3: "BEN", name: "Benin", number: "204" },
	{ code: "BM", code3: "BMU", name: "Bermuda", number: "060" },
	{ code: "BT", code3: "BTN", name: "Bhutan", number: "064" },
	{
		code: "BO",
		code3: "BOL",
		name: "Bolivia (Plurinational State of)",
		number: "068"
	},
	{
		code: "BQ",
		code3: "BES",
		name: "Bonaire, Sint Eustatius and Saba",
		number: "535"
	},
	{ code: "BA", code3: "BIH", name: "Bosnia and Herzegovina", number: "070" },
	{ code: "BW", code3: "BWA", name: "Botswana", number: "072" },
	{ code: "BV", code3: "BVT", name: "Bouvet Island", number: "074" },
	{ code: "BR", code3: "BRA", name: "Brazil", number: "076" },
	{
		code: "IO",
		code3: "IOT",
		name: "British Indian Ocean Territory (the)",
		number: "086"
	},
	{ code: "BN", code3: "BRN", name: "Brunei Darussalam", number: "096" },
	{ code: "BG", code3: "BGR", name: "Bulgaria", number: "100" },
	{ code: "BF", code3: "BFA", name: "Burkina Faso", number: "854" },
	{ code: "BI", code3: "BDI", name: "Burundi", number: "108" },
	{ code: "CV", code3: "CPV", name: "Cabo Verde", number: "132" },
	{ code: "KH", code3: "KHM", name: "Cambodia", number: "116" },
	{ code: "CM", code3: "CMR", name: "Cameroon", number: "120" },
	{ code: "CA", code3: "CAN", name: "Canada", number: "124" },
	{ code: "KY", code3: "CYM", name: "Cayman Islands (the)", number: "136" },
	{
		code: "CF",
		code3: "CAF",
		name: "Central African Republic (the)",
		number: "140"
	},
	{ code: "TD", code3: "TCD", name: "Chad", number: "148" },
	{ code: "CL", code3: "CHL", name: "Chile", number: "152" },
	{ code: "CN", code3: "CHN", name: "China", number: "156" },
	{ code: "CX", code3: "CXR", name: "Christmas Island", number: "162" },
	{
		code: "CC",
		code3: "CCK",
		name: "Cocos (Keeling) Islands (the)",
		number: "166"
	},
	{ code: "CO", code3: "COL", name: "Colombia", number: "170" },
	{ code: "KM", code3: "COM", name: "Comoros (the)", number: "174" },
	{
		code: "CD",
		code3: "COD",
		name: "Congo (the Democratic Republic of the)",
		number: "180"
	},
	{ code: "CG", code3: "COG", name: "Congo (the)", number: "178" },
	{ code: "CK", code3: "COK", name: "Cook Islands (the)", number: "184" },
	{ code: "CR", code3: "CRI", name: "Costa Rica", number: "188" },
	{ code: "HR", code3: "HRV", name: "Croatia", number: "191" },
	{ code: "CU", code3: "CUB", name: "Cuba", number: "192" },
	{ code: "CW", code3: "CUW", name: "Curaçao", number: "531" },
	{ code: "CY", code3: "CYP", name: "Cyprus", number: "196" },
	{ code: "CZ", code3: "CZE", name: "Czechia", number: "203" },
	{ code: "CI", code3: "CIV", name: "Côte d'Ivoire", number: "384" },
	{ code: "DK", code3: "DNK", name: "Denmark", number: "208" },
	{ code: "DJ", code3: "DJI", name: "Djibouti", number: "262" },
	{ code: "DM", code3: "DMA", name: "Dominica", number: "212" },
	{ code: "DO", code3: "DOM", name: "Dominican Republic (the)", number: "214" },
	{ code: "EC", code3: "ECU", name: "Ecuador", number: "218" },
	{ code: "EG", code3: "EGY", name: "Egypt", number: "818" },
	{ code: "SV", code3: "SLV", name: "El Salvador", number: "222" },
	{ code: "GQ", code3: "GNQ", name: "Equatorial Guinea", number: "226" },
	{ code: "ER", code3: "ERI", name: "Eritrea", number: "232" },
	{ code: "EE", code3: "EST", name: "Estonia", number: "233" },
	{ code: "SZ", code3: "SWZ", name: "Eswatini", number: "748" },
	{ code: "ET", code3: "ETH", name: "Ethiopia", number: "231" },
	{
		code: "FK",
		code3: "FLK",
		name: "Falkland Islands (the) [Malvinas]",
		number: "238"
	},
	{ code: "FO", code3: "FRO", name: "Faroe Islands (the)", number: "234" },
	{ code: "FJ", code3: "FJI", name: "Fiji", number: "242" },
	{ code: "FI", code3: "FIN", name: "Finland", number: "246" },
	{ code: "FR", code3: "FRA", name: "France", number: "250" },
	{ code: "GF", code3: "GUF", name: "French Guiana", number: "254" },
	{ code: "PF", code3: "PYF", name: "French Polynesia", number: "258" },
	{
		code: "TF",
		code3: "ATF",
		name: "French Southern Territories (the)",
		number: "260"
	},
	{ code: "GA", code3: "GAB", name: "Gabon", number: "266" },
	{ code: "GM", code3: "GMB", name: "Gambia (the)", number: "270" },
	{ code: "GE", code3: "GEO", name: "Georgia", number: "268" },
	{ code: "DE", code3: "DEU", name: "Germany", number: "276" },
	{ code: "GH", code3: "GHA", name: "Ghana", number: "288" },
	{ code: "GI", code3: "GIB", name: "Gibraltar", number: "292" },
	{ code: "GR", code3: "GRC", name: "Greece", number: "300" },
	{ code: "GL", code3: "GRL", name: "Greenland", number: "304" },
	{ code: "GD", code3: "GRD", name: "Grenada", number: "308" },
	{ code: "GP", code3: "GLP", name: "Guadeloupe", number: "312" },
	{ code: "GU", code3: "GUM", name: "Guam", number: "316" },
	{ code: "GT", code3: "GTM", name: "Guatemala", number: "320" },
	{ code: "GG", code3: "GGY", name: "Guernsey", number: "831" },
	{ code: "GN", code3: "GIN", name: "Guinea", number: "324" },
	{ code: "GW", code3: "GNB", name: "Guinea-Bissau", number: "624" },
	{ code: "GY", code3: "GUY", name: "Guyana", number: "328" },
	{ code: "HT", code3: "HTI", name: "Haiti", number: "332" },
	{
		code: "HM",
		code3: "HMD",
		name: "Heard Island and McDonald Islands",
		number: "334"
	},
	{ code: "VA", code3: "VAT", name: "Holy See (the)", number: "336" },
	{ code: "HN", code3: "HND", name: "Honduras", number: "340" },
	{ code: "HK", code3: "HKG", name: "Hong Kong", number: "344" },
	{ code: "HU", code3: "HUN", name: "Hungary", number: "348" },
	{ code: "IS", code3: "ISL", name: "Iceland", number: "352" },
	{ code: "IN", code3: "IND", name: "India", number: "356" },
	{ code: "ID", code3: "IDN", name: "Indonesia", number: "360" },
	{
		code: "IR",
		code3: "IRN",
		name: "Iran (Islamic Republic of)",
		number: "364"
	},
	{ code: "IQ", code3: "IRQ", name: "Iraq", number: "368" },
	{ code: "IE", code3: "IRL", name: "Ireland", number: "372" },
	{ code: "IM", code3: "IMN", name: "Isle of Man", number: "833" },
	{ code: "IL", code3: "ISR", name: "Israel", number: "376" },
	{ code: "IT", code3: "ITA", name: "Italy", number: "380" },
	{ code: "JM", code3: "JAM", name: "Jamaica", number: "388" },
	{ code: "JP", code3: "JPN", name: "Japan", number: "392" },
	{ code: "JE", code3: "JEY", name: "Jersey", number: "832" },
	{ code: "JO", code3: "JOR", name: "Jordan", number: "400" },
	{ code: "KZ", code3: "KAZ", name: "Kazakhstan", number: "398" },
	{ code: "KE", code3: "KEN", name: "Kenya", number: "404" },
	{ code: "KI", code3: "KIR", name: "Kiribati", number: "296" },
	{
		code: "KP",
		code3: "PRK",
		name: "Korea (the Democratic People's Republic of)",
		number: "408"
	},
	{ code: "KR", code3: "KOR", name: "Korea (the Republic of)", number: "410" },
	{ code: "KW", code3: "KWT", name: "Kuwait", number: "414" },
	{ code: "KG", code3: "KGZ", name: "Kyrgyzstan", number: "417" },
	{
		code: "LA",
		code3: "LAO",
		name: "Lao People's Democratic Republic (the)",
		number: "418"
	},
	{ code: "LV", code3: "LVA", name: "Latvia", number: "428" },
	{ code: "LB", code3: "LBN", name: "Lebanon", number: "422" },
	{ code: "LS", code3: "LSO", name: "Lesotho", number: "426" },
	{ code: "LR", code3: "LBR", name: "Liberia", number: "430" },
	{ code: "LY", code3: "LBY", name: "Libya", number: "434" },
	{ code: "LI", code3: "LIE", name: "Liechtenstein", number: "438" },
	{ code: "LT", code3: "LTU", name: "Lithuania", number: "440" },
	{ code: "LU", code3: "LUX", name: "Luxembourg", number: "442" },
	{ code: "MO", code3: "MAC", name: "Macao", number: "446" },
	{ code: "MG", code3: "MDG", name: "Madagascar", number: "450" },
	{ code: "MW", code3: "MWI", name: "Malawi", number: "454" },
	{ code: "MY", code3: "MYS", name: "Malaysia", number: "458" },
	{ code: "MV", code3: "MDV", name: "Maldives", number: "462" },
	{ code: "ML", code3: "MLI", name: "Mali", number: "466" },
	{ code: "MT", code3: "MLT", name: "Malta", number: "470" },
	{ code: "MH", code3: "MHL", name: "Marshall Islands (the)", number: "584" },
	{ code: "MQ", code3: "MTQ", name: "Martinique", number: "474" },
	{ code: "MR", code3: "MRT", name: "Mauritania", number: "478" },
	{ code: "MU", code3: "MUS", name: "Mauritius", number: "480" },
	{ code: "YT", code3: "MYT", name: "Mayotte", number: "175" },
	{ code: "MX", code3: "MEX", name: "Mexico", number: "484" },
	{
		code: "FM",
		code3: "FSM",
		name: "Micronesia (Federated States of)",
		number: "583"
	},
	{
		code: "MD",
		code3: "MDA",
		name: "Moldova (the Republic of)",
		number: "498"
	},
	{ code: "MC", code3: "MCO", name: "Monaco", number: "492" },
	{ code: "MN", code3: "MNG", name: "Mongolia", number: "496" },
	{ code: "ME", code3: "MNE", name: "Montenegro", number: "499" },
	{ code: "MS", code3: "MSR", name: "Montserrat", number: "500" },
	{ code: "MA", code3: "MAR", name: "Morocco", number: "504" },
	{ code: "MZ", code3: "MOZ", name: "Mozambique", number: "508" },
	{ code: "MM", code3: "MMR", name: "Myanmar", number: "104" },
	{ code: "NA", code3: "NAM", name: "Namibia", number: "516" },
	{ code: "NR", code3: "NRU", name: "Nauru", number: "520" },
	{ code: "NP", code3: "NPL", name: "Nepal", number: "524" },
	{ code: "NL", code3: "NLD", name: "Netherlands (the)", number: "528" },
	{ code: "NC", code3: "NCL", name: "New Caledonia", number: "540" },
	{ code: "NZ", code3: "NZL", name: "New Zealand", number: "554" },
	{ code: "NI", code3: "NIC", name: "Nicaragua", number: "558" },
	{ code: "NE", code3: "NER", name: "Niger (the)", number: "562" },
	{ code: "NG", code3: "NGA", name: "Nigeria", number: "566" },
	{ code: "NU", code3: "NIU", name: "Niue", number: "570" },
	{ code: "NF", code3: "NFK", name: "Norfolk Island", number: "574" },
	{
		code: "MP",
		code3: "MNP",
		name: "Northern Mariana Islands (the)",
		number: "580"
	},
	{ code: "NO", code3: "NOR", name: "Norway", number: "578" },
	{ code: "OM", code3: "OMN", name: "Oman", number: "512" },
	{ code: "PK", code3: "PAK", name: "Pakistan", number: "586" },
	{ code: "PW", code3: "PLW", name: "Palau", number: "585" },
	{ code: "PS", code3: "PSE", name: "Palestine, State of", number: "275" },
	{ code: "PA", code3: "PAN", name: "Panama", number: "591" },
	{ code: "PG", code3: "PNG", name: "Papua New Guinea", number: "598" },
	{ code: "PY", code3: "PRY", name: "Paraguay", number: "600" },
	{ code: "PE", code3: "PER", name: "Peru", number: "604" },
	{ code: "PH", code3: "PHL", name: "Philippines (the)", number: "608" },
	{ code: "PN", code3: "PCN", name: "Pitcairn", number: "612" },
	{ code: "PL", code3: "POL", name: "Poland", number: "616" },
	{ code: "PT", code3: "PRT", name: "Portugal", number: "620" },
	{ code: "PR", code3: "PRI", name: "Puerto Rico", number: "630" },
	{ code: "QA", code3: "QAT", name: "Qatar", number: "634" },
	{
		code: "MK",
		code3: "MKD",
		name: "Republic of North Macedonia",
		number: "807"
	},
	{ code: "RO", code3: "ROU", name: "Romania", number: "642" },
	{ code: "RU", code3: "RUS", name: "Russian Federation (the)", number: "643" },
	{ code: "RW", code3: "RWA", name: "Rwanda", number: "646" },
	{ code: "RE", code3: "REU", name: "Réunion", number: "638" },
	{ code: "BL", code3: "BLM", name: "Saint Barthélemy", number: "652" },
	{
		code: "SH",
		code3: "SHN",
		name: "Saint Helena, Ascension and Tristan da Cunha",
		number: "654"
	},
	{ code: "KN", code3: "KNA", name: "Saint Kitts and Nevis", number: "659" },
	{ code: "LC", code3: "LCA", name: "Saint Lucia", number: "662" },
	{
		code: "MF",
		code3: "MAF",
		name: "Saint Martin (French part)",
		number: "663"
	},
	{
		code: "PM",
		code3: "SPM",
		name: "Saint Pierre and Miquelon",
		number: "666"
	},
	{
		code: "VC",
		code3: "VCT",
		name: "Saint Vincent and the Grenadines",
		number: "670"
	},
	{ code: "WS", code3: "WSM", name: "Samoa", number: "882" },
	{ code: "SM", code3: "SMR", name: "San Marino", number: "674" },
	{ code: "ST", code3: "STP", name: "Sao Tome and Principe", number: "678" },
	{ code: "SA", code3: "SAU", name: "Saudi Arabia", number: "682" },
	{ code: "SN", code3: "SEN", name: "Senegal", number: "686" },
	{ code: "RS", code3: "SRB", name: "Serbia", number: "688" },
	{ code: "SC", code3: "SYC", name: "Seychelles", number: "690" },
	{ code: "SL", code3: "SLE", name: "Sierra Leone", number: "694" },
	{ code: "SG", code3: "SGP", name: "Singapore", number: "702" },
	{
		code: "SX",
		code3: "SXM",
		name: "Sint Maarten (Dutch part)",
		number: "534"
	},
	{ code: "SK", code3: "SVK", name: "Slovakia", number: "703" },
	{ code: "SI", code3: "SVN", name: "Slovenia", number: "705" },
	{ code: "SB", code3: "SLB", name: "Solomon Islands", number: "090" },
	{ code: "SO", code3: "SOM", name: "Somalia", number: "706" },
	{ code: "ZA", code3: "ZAF", name: "South Africa", number: "710" },
	{
		code: "GS",
		code3: "SGS",
		name: "South Georgia and the South Sandwich Islands",
		number: "239"
	},
	{ code: "SS", code3: "SSD", name: "South Sudan", number: "728" },
	{ code: "ES", code3: "ESP", name: "Spain", number: "724" },
	{ code: "LK", code3: "LKA", name: "Sri Lanka", number: "144" },
	{ code: "SD", code3: "SDN", name: "Sudan (the)", number: "729" },
	{ code: "SR", code3: "SUR", name: "Suriname", number: "740" },
	{ code: "SJ", code3: "SJM", name: "Svalbard and Jan Mayen", number: "744" },
	{ code: "SE", code3: "SWE", name: "Sweden", number: "752" },
	{ code: "CH", code3: "CHE", name: "Switzerland", number: "756" },
	{ code: "SY", code3: "SYR", name: "Syrian Arab Republic", number: "760" },
	{
		code: "TW",
		code3: "TWN",
		name: "Taiwan (Province of China)",
		number: "158"
	},
	{ code: "TJ", code3: "TJK", name: "Tajikistan", number: "762" },
	{
		code: "TZ",
		code3: "TZA",
		name: "Tanzania, United Republic of",
		number: "834"
	},
	{ code: "TH", code3: "THA", name: "Thailand", number: "764" },
	{ code: "TL", code3: "TLS", name: "Timor-Leste", number: "626" },
	{ code: "TG", code3: "TGO", name: "Togo", number: "768" },
	{ code: "TK", code3: "TKL", name: "Tokelau", number: "772" },
	{ code: "TO", code3: "TON", name: "Tonga", number: "776" },
	{ code: "TT", code3: "TTO", name: "Trinidad and Tobago", number: "780" },
	{ code: "TN", code3: "TUN", name: "Tunisia", number: "788" },
	{ code: "TR", code3: "TUR", name: "Turkey", number: "792" },
	{ code: "TM", code3: "TKM", name: "Turkmenistan", number: "795" },
	{
		code: "TC",
		code3: "TCA",
		name: "Turks and Caicos Islands (the)",
		number: "796"
	},
	{ code: "TV", code3: "TUV", name: "Tuvalu", number: "798" },
	{ code: "UG", code3: "UGA", name: "Uganda", number: "800" },
	{ code: "UA", code3: "UKR", name: "Ukraine", number: "804" },
	{
		code: "AE",
		code3: "ARE",
		name: "United Arab Emirates (the)",
		number: "784"
	},
	{
		code: "GB",
		code3: "GBR",
		name: "United Kingdom of Great Britain and Northern Ireland (the)",
		number: "826"
	},
	{
		code: "UM",
		code3: "UMI",
		name: "United States Minor Outlying Islands (the)",
		number: "581"
	},
	{
		code: "US",
		code3: "USA",
		name: "United States of America (the)",
		number: "840"
	},
	{ code: "UY", code3: "URY", name: "Uruguay", number: "858" },
	{ code: "UZ", code3: "UZB", name: "Uzbekistan", number: "860" },
	{ code: "VU", code3: "VUT", name: "Vanuatu", number: "548" },
	{
		code: "VE",
		code3: "VEN",
		name: "Venezuela (Bolivarian Republic of)",
		number: "862"
	},
	{ code: "VN", code3: "VNM", name: "Viet Nam", number: "704" },
	{ code: "VG", code3: "VGB", name: "Virgin Islands (British)", number: "092" },
	{ code: "VI", code3: "VIR", name: "Virgin Islands (U.S.)", number: "850" },
	{ code: "WF", code3: "WLF", name: "Wallis and Futuna", number: "876" },
	{ code: "EH", code3: "ESH", name: "Western Sahara", number: "732" },
	{ code: "YE", code3: "YEM", name: "Yemen", number: "887" },
	{ code: "ZM", code3: "ZMB", name: "Zambia", number: "894" },
	{ code: "ZW", code3: "ZWE", name: "Zimbabwe", number: "716" },
	{ code: "AX", code3: "ALA", name: "Åland Islands", number: "248" }
];
