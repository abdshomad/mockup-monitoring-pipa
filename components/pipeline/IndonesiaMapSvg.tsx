import React from 'react';

const IndonesiaMapSvg: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1195 625" 
        className="absolute top-0 left-0 w-full h-full object-contain"
        fontFamily="Arial, sans-serif"
    >
        {/* Background */}
        <rect width="1195" height="625" fill="#e0e0e0" />

        {/* Geographic Features */}
        <g id="geography" fill="#f5f5f5" stroke="#bdbdbd" strokeWidth="0.5">
            {/* Sumatra */}
            <path d="M192,25 L105,100 L50,210 L30,280 L80,330 L170,300 L240,230 L300,200 L360,240 L380,300 L320,380 L290,390 L240,350 L180,380 L160,450 L200,480 L250,450 L300,420 L370,430 L350,480 L300,520 L150,550 L80,480 L60,400 L110,350 L30,290 L50,220 L110,100 L195,28 Z" />
            {/* Java & Bali */}
            <path d="M430,480 L460,450 L520,440 L600,450 L680,470 L750,500 L850,510 L950,500 L1050,530 L1100,550 L1150,520 L1130,480 L1080,470 L1000,460 L900,450 L800,440 L700,420 L620,410 L550,420 L480,450 L435,475 Z" />
            {/* Kalimantan (Borneo) */}
            <path d="M780,50 L850,40 L950,60 L1050,120 L1100,200 L1120,280 L1080,350 L1000,380 L920,350 L850,280 L800,200 L780,100 Z" />
        </g>
        
        {/* Sea Names */}
        <g id="sea-labels" fill="#b0bec5" fontSize="14" fontWeight="bold">
            <text x="650" y="250">Jawa Sea</text>
        </g>
        
        {/* Pipelines */}
        <g id="pipelines">
            {/* South Sumatra */}
            <path d="M110,130 Q150,180 200,200 T280,220 T350,280 T390,350" fill="none" stroke="#facc15" strokeWidth="4" />
            {/* Cisem-1 & East Java */}
            <path d="M540,380 Q580,350 640,380 T750,390 T850,410 T950,420 T1080,430" fill="none" stroke="#f97316" strokeWidth="4" />
            <path d="M820,445 Q880,455 950,460 T1050,470 T1130,495" fill="none" stroke="#0ea5e9" strokeWidth="4" />
            {/* Cisem-2 & link */}
            <path d="M430,430 Q480,410 530,405" fill="none" stroke="#dc2626" strokeWidth="3" strokeDasharray="8 4" />
            <path d="M428,432 Q478,412 528,407" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="8 4" />
            <path d="M530,405 Q580,400 600,385" fill="none" stroke="#16a34a" strokeWidth="4" />
        </g>

        {/* Icons and Markers */}
        <g id="markers-and-icons">
            {/* Station Clusters */}
            <g fill="#facc15" stroke="#ca8a04" strokeWidth="0.5">
                <path d="M100,120 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M115,125 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M120,110 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M130,140 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M180,145 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M250,180 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M340,270 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M390,340 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M420,400 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M450,420 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M500,425 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M545,385 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M600,380 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M635,370 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M690,400 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M820,440 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M960,455 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M1080,480 l5-10 h10 l5,10 l-5,10 h-10 Z" />
                <path d="M1120,485 l5-10 h10 l5,10 l-5,10 h-10 Z" />
            </g>
            {/* FSRU NR Ship */}
            <g transform="translate(420, 390)">
                <path d="M0,0 h60 v-10 l-5,-5 h-50 l-5,5 Z" fill="#b71c1c" />
                <rect x="2" y="-12" width="56" height="2" fill="#e0e0e0" />
                <path d="M5,0 h50 v-8 h-50 Z" fill="#424242" />
            </g>
            {/* RU IV Cilacap */}
            <g transform="translate(560, 480)" fill="#0288d1">
                <rect x="0" y="0" width="30" height="20" />
                <rect x="5" y="-10" width="5" height="10" />
                <rect x="20" y="-15" width="5" height="15" />
                <path d="M0,0 q15,-10 30,0" stroke="#0288d1" strokeWidth="2" fill="none" />
            </g>
             {/* KJG Platform */}
             <g transform="translate(740, 340)">
                <rect x="0" y="0" width="20" height="10" fill="#607d8b" />
                <path d="M5,0 v15 M15,0 v15" stroke="#607d8b" strokeWidth="2" />
                <rect x="-5" y="-10" width="30" height="10" fill="#455a64" />
             </g>
             {/* JTB Facility */}
             <g transform="translate(860, 430)">
                <rect x="0" y="0" width="25" height="15" fill="#1e88e5" stroke="#fff" strokeWidth="1" />
             </g>
            {/* Cisem Circles */}
            <g>
                <circle cx="620" cy="400" r="12" fill="#4caf50" />
                <text x="620" y="404" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">1</text>
                <circle cx="500" cy="400" r="12" fill="#f44336" />
                <text x="500" y="404" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">2</text>
            </g>
        </g>

        {/* Labels and Logos */}
        <g id="text-and-logos">
            {/* Main Title */}
            <text x="20" y="40" fontSize="24" fontWeight="bold" fill="#212121">
                Jaringan Pipa Transmisi Cisem-1 dan Integrasinya dengan Pipa Pertagas di Jawa Timur (Gresem)
            </text>
            
            {/* City/Region Labels */}
            <g fontSize="12" fill="#424242">
                <text x="180" y="100">Palembang</text>
                <text x="200" y="125">SUMATERA</text>
                <text x="190" y="180">Batu Raja Barat</text>
                <text x="40, " y="120">BENGKULU</text>
                <text x="280, " y="280">LAMPUNG</text>
                <text x="350, " y="350">Tanjungkarang-</text>
                <text x="350, " y="365">Telukbetung</text>
                <text x="410, " y="420">Serang</text>
                <text x="440, " y="435">Jakarta</text>
                <text x="410, " y="450">BANTEN</text>
                <text x="680, " y="400">Semarang</text>
                <text x="750, " y="440">Purwodadi</text>
                <text x="960, " y="450">Surabaya</text>
                <text x="1080, " y="480">Situbondo</text>
                <text x="1150, " y="520">BALI</text>
                <text x="900, " y="100">KALIMANTAN</text>
                <text x="900, " y="115">SELATAN</text>
                <text x="890, " y="150">Banjarmasin</text>
            </g>

            {/* Pertamina Logos & Text */}
            <g>
                <path d="M210,135 l20,-10 l-20,-10 Z" fill="#dc2626"/>
                <path d="M210,135 l20,10 v-20 Z" fill="#0288d1"/>
                <path d="M230,125 h-20 l10,-15 Z" fill="#4caf50"/>
                <text x="240" y="125" fontWeight="bold" fontSize="12" fill="#212121">PERTAMINA<tspan fill="#0288d1">GAS</tspan></text>
                <text x="240" y="140" fontWeight="bold" fontSize="12" fill="#0288d1">South Sumatera Area</text>
            </g>
            <g>
                <path d="M380,380 l15,-8 l-15,-8 Z" fill="#dc2626"/>
                <path d="M380,380 l15,8 v-16 Z" fill="#fbc02d"/>
                <text x="400" y="380" fontWeight="bold" fontSize="10" fill="#212121">PERTAMINA</text>
                <text x="400" y="392" fontWeight="bold" fontSize="10" fill="#212121">GAS NEGARA</text>
            </g>
            <g>
                <path d="M510,450 l20,-10 l-20,-10 Z" fill="#dc2626"/>
                <path d="M510,450 l20,10 v-20 Z" fill="#0288d1"/>
                <path d="M530,440 h-20 l10,-15 Z" fill="#4caf50"/>
                <text x="540" y="440" fontWeight="bold" fontSize="12" fill="#212121">PERTAMINA<tspan fill="#0288d1">GAS</tspan></text>
                <text x="540" y="455" fontWeight="bold" fontSize="12" fill="#0288d1">West Java Area</text>
            </g>
            <g>
                 <path d="M960,480 l20,-10 l-20,-10 Z" fill="#dc2626"/>
                <path d="M960,480 l20,10 v-20 Z" fill="#0288d1"/>
                <path d="M980,470 h-20 l10,-15 Z" fill="#4caf50"/>
                <text x="990" y="470" fontWeight="bold" fontSize="12" fill="#212121">PERTAMINA<tspan fill="#0288d1">GAS</tspan></text>
                <text x="990" y="485" fontWeight="bold" fontSize="12" fill="#0288d1">East Java Area</text>
            </g>

            {/* Other Logos and Text */}
            <g>
                <text x="430, " y="410" fill="#424242" fontSize="12" fontWeight="bold">FSRU NR</text>
                <text x="565, " y="515" fill="#424242" fontSize="12" fontWeight="bold">RU IV Cilacap</text>
                <text x="770, " y="350" fill="#424242" fontSize="12" fontWeight="bold">KJG</text>
                <text x="770, " y="362" fill="#757575" fontSize="8">PT Kalimantan Jawa Gas</text>
                <text x="865, " y="450" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">JTB</text>
                
                {/* Lemigas Logo */}
                <rect x="600" y="340" width="120" height="30" fill="white" />
                <text x="605" y="360" fontSize="18" fontWeight="bold" fill="#0d47a1">
                    <tspan>LEMIGAS</tspan>
                </text>

                {/* Cisem Text Labels */}
                <g fontWeight="bold" fontSize="12">
                    <text x="510" y="370" fill="#f97316">Cisem-2</text>
                    <text x="510" y="385" fill="#f97316">Batang - KHT</text>
                    <text x="620" y="370" fill="#16a34a">Cisem-1</text>
                    <text x="620" y="385" fill="#16a34a">Semarang - Batang</text>
                </g>
            </g>

            {/* Specification Box */}
            <g transform="translate(40, 480)">
                <rect width="250" height="120" fill="#fff" stroke="#f97316" strokeWidth="2" />
                <rect width="250" height="30" fill="#f97316" />
                <text x="10" y="20" fill="white" fontSize="14" fontWeight="bold">SPESIFIKASI PIPA CISEM-1</text>
                <g fontSize="12" fill="#212121" transform="translate(10, 45)">
                    <text y="0"><tspan fontWeight="bold" textAnchor="end" dx="50">• Pemilik</tspan><tspan dx="10">: LEMIGAS</tspan></text>
                    <text y="15"><tspan fontWeight="bold" textAnchor="end" dx="50">• Operator</tspan><tspan dx="10">: Pertagas</tspan></text>
                    <text y="30"><tspan fontWeight="bold" textAnchor="end" dx="50">• Panjang</tspan><tspan dx="10">: 62 KM</tspan></text>
                    <text y="45"><tspan fontWeight="bold" textAnchor="end" dx="50">• Diameter</tspan><tspan dx="10">: 20 inch</tspan></text>
                    <text y="60"><tspan fontWeight="bold" textAnchor="end" dx="50">• Class Loc.</tspan><tspan dx="10">: 3 & 4</tspan></text>
                    <text y="75"><tspan fontWeight="bold" textAnchor="end" dx="50">• ROW</tspan><tspan dx="10">: BBPJN, Tol</tspan></text>
                </g>
            </g>

            {/* Copyright/Logo section */}
            <g transform="translate(1050, 580)" fontSize="10" fill="#757575">
                <text>POWERED BY</text>
                <text x="65" y="0" fontWeight="bold" fontSize="14" fill="#0288d1">DIGIO</text>
                <text x="105" y="0" fontWeight="bold" fontSize="14" fill="#757575">sipga</text>
            </g>
        </g>
    </svg>
);

export default IndonesiaMapSvg;
