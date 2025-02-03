// hotels.ts

// Define the Hotel interface using camelCase naming conventions.
// The region property is now an array of region UUID strings.
export interface Hotel {
  uuid: string;
  name: string | null;
  region: string[] | null; // now an array of region UUIDs
  address: string | null;
  contact: string | null; // storing phone numbers as strings
  email: string | null;
  website: string | null;
  facebook: string | null;
  instagram: string | null;
  petabookPartner: boolean; // converted to boolean
  shortDescription: string | null;
  longDescription: string | null;
  services: string | null;
  prices: number | null;
  reservationEmail: string | null;
  responsableName: string | null;
  conditions: string | null;
  workingHours: string | null;
  images: string | null;
  checkInHours: string | null;
  checkOutHours: string | null;
  checkInDays: string | null;
  checkOutDays: string | null;
  restrictions: string | null;
  gps?: {
    lat: number;
    lng: number;
  };
}

// A mapping type to index hotels by their uuid.
export interface HotelData {
  [uuid: string]: Hotel;
}

/*
  Region IDs (from your regionList):
    - Lisboa:      "c5d53de2-15e5-4fa8-a0f3-9c4b30b18a91"
    - Centro:      "ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34"
    - Porto:       "6e3c11f3-3a28-4e2b-bf9e-6713c45b0a6a"
    - Norte:       "f0d2c8a9-5f7a-4e30-b8a4-d3b9a8f7e6c5"
    - Arquipélagos:"ea3f9a57-2c8b-40d8-8f51-7f9f8d8a27cb"
    - Algarve:     "ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42"
    - Alentejo:    "d1a5a76f-7a8f-4b92-9a3f-abc1d1e2f345"
*/

// The hotel list – note that "n.a." values have been converted to null.
// The region property is now an array of region UUIDs.
// For hotels originally from Lisbon, we add both "Lisboa" and "Centro".
// For hotels originally from Porto, we add both "Porto" and "Norte".
export const hotelList: Hotel[] = [
  // Hotels from Lisbon:
  {
    uuid: '1a2b3c4d-0001-0001-0001-000000000001',
    name: 'Quinta da Patada',
    region: [
      'c5d53de2-15e5-4fa8-a0f3-9c4b30b18a91', // Lisboa
      'ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34', // Centro
    ],
    address:
      'Rua do Murtal, Quinta da Patada Manjoeira, 2660-499 Santo Antão do Tojal',
    contact: '912385650',
    email: 'geral@quintadapatada.com',
    website: 'https://quintadapatada.com/',
    facebook: 'https://www.facebook.com/quintadapatada/',
    instagram: 'https://www.instagram.com/quintadapatada/',
    petabookPartner: true,
    shortDescription:
      'A Quinta da Patada, em Loures, é um hotel para cães com hospedagem, creche e banhos, oferecendo supervisão 24 horas.',
    longDescription:
      'A Quinta da Patada, localizada em Santo Antão do Tojal, Loures, oferece hospedagem, creche, banhos e tosquias, com 25 boxes individuais e atividades ao ar livre, garantindo conforto e segurança aos hóspedes.',
    services: 'Hotel canino',
    prices: 17,
    reservationEmail: 'geral@quintadapatada.com',
    responsableName: '',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0002-0002-0002-000000000002',
    name: 'Just4Buddies',
    region: [
      'c5d53de2-15e5-4fa8-a0f3-9c4b30b18a91',
      'ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34',
    ],
    address: 'Praceta Damião Peres 25, São Domingos de Rana',
    contact: '911128070',
    email: 'geral@just4buddies.pt',
    website: 'https://just4buddies.pt/',
    facebook: 'https://www.facebook.com/just4buddies?locale=pt_BR',
    instagram: 'https://www.instagram.com/just4buddies/',
    petabookPartner: true,
    shortDescription:
      'A creche canina em Cascais garante dias felizes e estimulantes para os patudos.',
    longDescription:
      'A creche canina de Just4Buddies em Cascais proporciona um ambiente seguro e carinhoso, com loja e treinadora, enquanto os donos estão ausentes.',
    services: 'Hotel canino',
    prices: 18,
    reservationEmail: 'geral@just4buddies.pt',
    responsableName: '',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0003-0003-0003-000000000003',
    name: 'Recreio Canino',
    region: [
      'c5d53de2-15e5-4fa8-a0f3-9c4b30b18a91',
      'ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34',
    ],
    address: 'Rua da Amoreira, Lousa',
    contact: '210963508',
    email: 'info@recreiocanino.com',
    website: 'https://recreiocanino.com/',
    facebook: 'https://www.facebook.com/RecreioCanino/?locale=pt_PT',
    instagram: 'https://www.instagram.com/recreiocanino/',
    petabookPartner: false,
    shortDescription:
      'Recreio Canino promove socialização e bem-estar dos cães com serviços personalizados.',
    longDescription:
      'Recreio Canino oferece um ambiente seguro e estimulante para os cães, funcionando de segunda a sexta das 9h às 16h, com serviços adaptados às necessidades dos animais.',
    services: 'Hotel canino',
    prices: 25,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0004-0004-0004-000000000004',
    name: '101 Hotel Canino',
    region: [
      'c5d53de2-15e5-4fa8-a0f3-9c4b30b18a91',
      'ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34',
    ],
    address:
      'Quinta do Pinheirinho, R. dos Comerciantes, Pinhal Novo',
    contact: '913847150',
    email: '101hotelcanino@gmail.com',
    website: 'https://www.banhosetosquiasaodomicilio.pt/hotel-canino',
    facebook:
      'https://www.facebook.com/p/101-Servi%C3%A7os-para-C%C3%A3es-e-Gatos-ao-Domic%C3%ADlio-100063469993660/?locale=pt_BR',
    instagram: 'https://www.instagram.com/101servicos/',
    petabookPartner: true,
    shortDescription:
      'O Hotel Canino 101 oferece instalações modernas com boxes privadas e parques espaçosos.',
    longDescription:
      'Localizado numa zona tranquila do Pinhal Novo, o Hotel Canino 101 dispõe de 20 boxes privadas e amplos parques com áreas equipadas para a socialização dos cães. Oferece serviços de banho e transporte, permitindo aos donos acompanhar a estadia por vídeos.',
    services: 'Hotel canino',
    prices: 12,
    reservationEmail: '101hotelcanino@gmail.com',
    responsableName: '',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0005-0005-0005-000000000005',
    name: 'Curti Dog',
    region: [
      'c5d53de2-15e5-4fa8-a0f3-9c4b30b18a91',
      'ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34',
    ],
    address: 'Rua Casal da Curtinha 13 2530, Reguengo Grande',
    contact: '914819881',
    email: 'curti_dog@hotmail.com',
    website: null,
    facebook: 'https://www.facebook.com/CurtiDog18/?locale=pt_PT',
    instagram: 'https://www.instagram.com/curti_dog/',
    petabookPartner: true,
    shortDescription:
      'A Curti Dog oferece hospedagem, creche e estética para cães e gatos, com serviços de petshop, adestramento e transporte.',
    longDescription:
      'Estabelecida em 2018, a Curti Dog é uma empresa familiar que oferece serviços variados para cães e gatos, incluindo hospedagem, creche e estética. Durante o dia, os animais têm acesso a um espaço aberto, enquanto à noite são acomodados em boxes individuais com proteção contra condições climáticas adversas. Também oferece serviços de adestramento e transporte para consultas veterinárias.',
    services: 'Hotel canino',
    prices: 10,
    reservationEmail: 'curti_dog@hotmail.com',
    responsableName: '',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0006-0006-0006-000000000006',
    name: 'Sweetpet',
    region: [
      'c5d53de2-15e5-4fa8-a0f3-9c4b30b18a91',
      'ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34',
    ],
    address: 'Caminho das Batatas nº 2, Queijas',
    contact: '912269890',
    email: 'info@sweetpet.pt',
    website: 'https://www.sweetpet.pt/',
    facebook:
      'https://www.facebook.com/sweetpetcascais/?locale=pt_PT',
    instagram: 'https://www.instagram.com/sweetpet/',
    petabookPartner: false,
    shortDescription:
      'Sweetpet oferece um ambiente holístico para o bem-estar canino com serviços de saúde, educação e socialização.',
    longDescription:
      'Situada em Queijas, a Sweetpet adota uma abordagem holística no cuidado dos cães, tratando-os como membros da família. Suas instalações, que se estendem por 9.000 m², incluem parques, piscina e um chalet, e oferecem programas personalizados de saúde e educação canina.',
    services: 'Hotel canino',
    prices: 20,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  // Hotels from Porto:
  {
    uuid: '1a2b3c4d-0009-0009-0009-000000000009',
    name: 'Pet Hotel Gaia',
    region: [
      '6e3c11f3-3a28-4e2b-bf9e-6713c45b0a6a', // Porto
      'f0d2c8a9-5f7a-4e30-b8a4-d3b9a8f7e6c5', // Norte
    ],
    address: 'Rua Mata 798, Vila Nova de Gaia',
    contact: '227840230',
    email: null,
    website: 'https://pethotelgaia.com/',
    facebook: 'https://www.facebook.com/pethotelgaia/?locale=pt_PT',
    instagram: 'https://www.instagram.com/pet.hotel.gaia/',
    petabookPartner: false,
    shortDescription:
      'Pet Hotel Gaia oferece alojamento para cães e gatos com passeios diários e apoio veterinário, com opções de estadia Outdoor e Indoor.',
    longDescription:
      'Localizado em Vila Nova de Gaia, o Pet Hotel Gaia oferece alojamento para cães e gatos, dividido em estadias Outdoor para cães de médio/grande porte e Indoor para cães pequenos, com serviços de água fresca, cama confortável, passeios diários e apoio veterinário.',
    services: 'Hotel canino',
    prices: 16,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0010-0010-0010-000000000010',
    name: 'Domi Canis Cattus EcoHotel',
    region: [
      '6e3c11f3-3a28-4e2b-bf9e-6713c45b0a6a',
      'f0d2c8a9-5f7a-4e30-b8a4-d3b9a8f7e6c5',
    ],
    address: 'Rua da Cunha 140, Parada, Vila do Conde',
    contact: '913274697',
    email: 'domicaniscattus@gmail.com',
    website: null,
    facebook: 'https://www.facebook.com/Ruicosta2016/?locale=pt_PT',
    instagram: 'https://www.instagram.com/dcc_domi_canis_cattus/',
    petabookPartner: true,
    shortDescription:
      'O Domi Canis Cattus EcoHotel combina design inovador e conforto para animais, sendo premiado e reconhecido internacionalmente.',
    longDescription:
      'Concebido em 2015 e inaugurado em 2019, o Domi Canis Cattus EcoHotel, no distrito do Porto, se consolidou como um dos espaços mais inovadores na hospitalidade para animais, com prêmios como 5 Estrelas Regiões 2020 e reconhecimentos internacionais. Sua infraestrutura de vanguarda oferece um ambiente seguro e funcional para os hóspedes de quatro patas.',
    services: 'Hotel canino',
    prices: 25,
    reservationEmail: 'domicaniscattus@gmail.com',
    responsableName: '',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0011-0011-0011-000000000011',
    name: 'Pet Home',
    region: [
      '6e3c11f3-3a28-4e2b-bf9e-6713c45b0a6a',
      'f0d2c8a9-5f7a-4e30-b8a4-d3b9a8f7e6c5',
    ],
    address: 'Zona Industrial Arcos de Sadrão 401, Vila Nova de Gaia',
    contact: '935094048',
    email: 'geral.pet.home@gmail.com',
    website: 'https://pethomept.wixsite.com/pethome',
    facebook: 'https://pethomept.wixsite.com/pethome',
    instagram: 'https://www.instagram.com/_pet.home_/',
    petabookPartner: false,
    shortDescription:
      'A Pet Home foi criada por enfermeiras veterinárias e educadoras caninas, oferecendo hotel, creche, treino e serviços estéticos.',
    longDescription:
      'Localizada na Zona Industrial dos Arcos de Sardão em Vila Nova de Gaia, a Pet Home oferece serviços de treino, consultas, creche e hotel para animais, com cada pet tendo direito a uma box individual e os donos acompanhando a estadia via redes sociais.',
    services: 'Hotel canino',
    prices: 0,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0012-0012-0012-000000000012',
    name: 'Pets and Family',
    region: [
      '6e3c11f3-3a28-4e2b-bf9e-6713c45b0a6a',
      'f0d2c8a9-5f7a-4e30-b8a4-d3b9a8f7e6c5',
    ],
    address: 'Rua Nova do Arquinho 426, Maia',
    contact: '912741229',
    email: null,
    website: 'https://petsandfamily.pt/',
    facebook:
      'https://www.facebook.com/petsandfamilypt/?locale=pt_BR',
    instagram: 'https://www.instagram.com/pets.and.family/',
    petabookPartner: false,
    shortDescription:
      'Pets and Family oferece creche e hotel canino sem espaços confinados, com avaliação inicial para segurança e adaptação.',
    longDescription:
      'Localizada na Maia, Pets and Family oferece um serviço diferenciado de creche e hotel para cães, funcionando das 8h às 20h, sem espaços confinados e com atenção 24 horas, com descontos variáveis conforme o número de cães e fidelidade ao serviço.',
    services: 'Hotel canino',
    prices: 19,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  // Hotels from Norte (already have region "Norte")
  {
    uuid: '1a2b3c4d-0013-0013-0013-000000000013',
    name: 'Nortdog',
    region: ['f0d2c8a9-5f7a-4e30-b8a4-d3b9a8f7e6c5'],
    address: 'Avenida de Santo André, nº 163, Braga',
    contact: '965070933',
    email: 'geral@nortdog.pt',
    website: 'https://nortdog.pt/',
    facebook: 'https://www.facebook.com/nortdogbraga/?locale=pt_PT',
    instagram: 'https://www.instagram.com/nortdog_petinnature/',
    petabookPartner: false,
    shortDescription:
      'Nortdog, com 25 anos de experiência, oferece hotel, creche e treino para cães e gatos, com eventos solidários.',
    longDescription:
      "A Nortdog é uma academia para cães e gatos em Braga, com 25 anos de experiência, oferecendo uma ampla seleção de produtos e serviços, incluindo hotéis, creches e cursos de obediência. Também organiza eventos como a 'Aqua Dog Party', destinando parte das receitas a associações de proteção animal.",
    services: 'Hotel canino',
    prices: 16,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0014-0014-0014-000000000014',
    name: 'Family Dog',
    region: ['f0d2c8a9-5f7a-4e30-b8a4-d3b9a8f7e6c5'],
    address: 'Rua do Bustelo 450, Alheira, Barcelos',
    contact: '912376597',
    email: 'geral@hotelfamilydog.pt',
    website: 'https://hotelfamilydog.pt/',
    facebook: 'https://www.facebook.com/hotelfamilydog/',
    instagram: 'https://www.instagram.com/hotelfamilydog/',
    petabookPartner: false,
    shortDescription:
      'Family Dog oferece quartos autónomos e parques ao ar livre com atenção personalizada para o bem-estar dos cães.',
    longDescription:
      'Localizado em Alheira, Barcelos, o Hotel Family Dog destaca-se pelo cuidado e conforto oferecidos aos cães, com quartos autónomos, amplos parques para recreação e atendimento personalizado, funcionando de segunda a sexta, das 9h às 18h.',
    services: 'Hotel canino',
    prices: 18,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  // Hotels from Arquipélagos:
  {
    uuid: '1a2b3c4d-0015-0015-0015-000000000015',
    name: 'Dogtel',
    region: ['ea3f9a57-2c8b-40d8-8f51-7f9f8d8a27cb'],
    address: 'Rua do Lazareto 227, São Gonçalo',
    contact: '927206258',
    email: 'geral@dogtel.pt',
    website: 'https://www.dogtel.pt/',
    facebook: 'https://www.facebook.com/Dogtel/?locale=pt_PT',
    instagram: 'https://www.instagram.com/dogtel_school/',
    petabookPartner: true,
    shortDescription:
      'Dogtel oferece alojamento, treinos, creche e spa para cães e gatos em um espaço de 3000m².',
    longDescription:
      'Localizado na Ilha da Madeira, o Dogtel oferece uma gama completa de serviços para cães e gatos, incluindo alojamento, treinos, creche, spa e consultório veterinário. Conta também com um centro de reabilitação para condições como artrite.',
    services: 'Hotel canino',
    prices: 0,
    reservationEmail: 'Ricardojesus@dogtel.pt',
    responsableName: '',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0016-0016-0016-000000000016',
    name: 'Clínica Veterinária São Miguel',
    region: ['ea3f9a57-2c8b-40d8-8f51-7f9f8d8a27cb'],
    address: 'Rua das Mercês 29, Atalhada Lagoa',
    contact: '968066368',
    email: 'geral@cvsm.pt',
    website: 'https://www.cvsm.pt/#hotel',
    facebook: 'https://www.facebook.com/ClinicaVeterinariaSaoMiguel/',
    instagram: null,
    petabookPartner: false,
    shortDescription:
      'Clínica Veterinária São Miguel dispõe de canis para cães e gatis para gatos, funcionando o ano todo.',
    longDescription:
      'Com 25 canis exteriores, 4 interiores para cães e 21 gatis para gatos, a Clínica Veterinária São Miguel oferece serviços personalizados de alimentação e cuidados, funcionando 365 dias por ano com horários flexíveis.',
    services: 'Hotel canino',
    prices: 0,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  // Hotels from Algarve:
  {
    uuid: '1a2b3c4d-0017-0017-0017-000000000017',
    name: 'Hotel do Cão Algarve',
    region: ['ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42'],
    address: 'Vale da Rainha, Estrada de Monchique, Portimão',
    contact: '963876246',
    email: 'info@hoteldocao.pt',
    website: 'https://www.hoteldocao.pt/',
    facebook: 'https://www.facebook.com/hoteldocaoalgarve',
    instagram: 'https://www.instagram.com/hoteldocao/',
    petabookPartner: false,
    shortDescription:
      'Hotel do Cão Algarve oferece alojamentos de luxo, praia para cães e SPA, com vigilância veterinária e transporte.',
    longDescription:
      'O Hotel do Cão Algarve proporciona uma experiência única para cães e gatos, com áreas verdes, alojamentos de luxo, praia exclusiva para cães, vigilância veterinária e um SPA que trata de banhos, escovagens e cortes de unhas, além de oferecer serviço de transporte.',
    services: 'Hotel canino',
    prices: 0,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0018-0018-0018-000000000018',
    name: 'Pets Inn',
    region: ['ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42'],
    address: 'Lugar da Renda, Loulé',
    contact: '915435823',
    email: 'contacto@petsinn.pt',
    website: 'https://petsinn.pt/',
    facebook: 'https://www.facebook.com/petsinnalgarve/',
    instagram: 'https://www.instagram.com/petsinn_algarve/',
    petabookPartner: true,
    shortDescription:
      'Pets Inn oferece um ambiente seguro e tranquilo para cães, gatos e outros animais com alojamento e creche canina.',
    longDescription:
      'Localizado no campo em Loulé, Pets Inn oferece um ambiente personalizado para cães, gatos e outras espécies. Além de alojamento temporário, disponibiliza day care com atenção individualizada, acomodando diversos animais em um espaço que proporciona conforto e segurança.',
    services: 'Hotel canino',
    prices: 20,
    reservationEmail: 'geral@petsinn.pt',
    responsableName: '',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0019-0019-0019-000000000019',
    name: 'Dog Spa',
    region: ['ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42'],
    address: 'Monte Escrivão, Sítio da Igreja, Olhão',
    contact: '964639587',
    email: 'info@dogspa.com.pt',
    website: 'https://www.dogspa.pt/',
    facebook: 'https://www.facebook.com/DogSpaQuintaLobos/',
    instagram: 'https://www.instagram.com/dogspa_algarve/',
    petabookPartner: false,
    shortDescription:
      'Dog Spa oferece hotel, creche, tosquia, treinos e transporte para cães e gatos, com acompanhamento veterinário.',
    longDescription:
      'A Dog Spa em Olhão conta com instalações projetadas para o conforto e diversão dos animais, com boxes espaçosas e uma área verde vedada para brincadeiras. Uma equipa de profissionais garante a saúde e o bem-estar dos hóspedes, acompanhando-os individualmente.',
    services: 'Hotel canino',
    prices: 0,
    reservationEmail: null,
    responsableName: 'n.a.',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0020-0020-0020-000000000020',
    name: 'Centro Canino do Algarve',
    region: ['ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42'],
    address: 'Estrada municipal nr526 -962 A, Albufeira',
    contact: '933925808',
    email: 'centrocaninoalgarve@gmail.com',
    website: null,
    facebook: 'https://www.facebook.com/CCAlgarve/?locale=pt_BR',
    instagram: null,
    petabookPartner: false,
    shortDescription:
      'Centro Canino do Algarve oferece alojamento, passeios, treino e tosquias num ambiente rural com instalações modernas.',
    longDescription:
      'Localizado em Albufeira, o Centro Canino do Algarve oferece serviços para cães, como alojamento, alimentação, passeios, brincadeiras, treino, banhos e tosquias, em um ambiente rural relaxante, com canis individuais e áreas de lazer.',
    services: 'Hotel canino',
    prices: 0,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0021-0021-0021-000000000021',
    name: 'Pet Hotel do Algarve',
    region: ['ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42'],
    address: 'Caixa Postal 245-A, Faro',
    contact: '960289169',
    email: 'pethoteldoalgarve.lda@gmail.com',
    website: 'https://www.pethoteldoalgarve.com/',
    facebook:
      'https://www.facebook.com/pethoteldoalgarve/?locale=pt_PT',
    instagram: 'https://www.instagram.com/pet.hotel.do.algarve/',
    petabookPartner: true,
    shortDescription:
      'Pet Hotel do Algarve oferece suítes privativas isotérmicas, passeios diários e apoio veterinário, com transporte especializado.',
    longDescription:
      'O Merrylegs PET Hotel é um hotel familiar que oferece alojamento de luxo, cuidado diário, treino e serviço de entrega e coleta, proporcionando um ambiente seguro para cães, gatos e pequenos animais.',
    services: 'Hotel canino',
    prices: 22,
    reservationEmail: 'pethoteldoalgarve.lda@gmail.com',
    responsableName: '',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0022-0022-0022-000000000022',
    name: 'Merrylegs Pet Hotel',
    region: ['ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42'],
    address: 'Sitio Estação Loulé 4 Estrada, Loulé',
    contact: '927296332',
    email: 'merrylegspethotel@gmail.com',
    website: 'https://www.merrylegspethotel.com/',
    facebook: 'https://www.facebook.com/merrylegspethotel',
    instagram:
      'https://www.instagram.com/explore/locations/1019415244/merrylegs-pet-hotel/',
    petabookPartner: false,
    shortDescription:
      'Merrylegs Pet Hotel oferece alojamento de luxo, treino e transporte para cães, gatos e pequenos animais, com 12 anos de experiência.',
    longDescription:
      'O Merrylegs PET Hotel é um hotel familiar que oferece alojamento de luxo, cuidado diário, treino e serviço de entrega e coleta, proporcionando um ambiente seguro e confortável para cães, gatos e pequenos animais, com ênfase no exercício e cuidados diários.',
    services: 'Hotel canino',
    prices: 0,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0023-0023-0023-000000000023',
    name: 'Herdade Bonanza',
    region: ['ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42'],
    address: 'Estrada da Barragem, Sitio da Moira 491, Lagos',
    contact: '967344230',
    email: 'info@herdadebonanza.com',
    website: 'https://www.herdadebonanza.com/',
    facebook: 'https://www.facebook.com/hbonanzadogresort/',
    instagram: 'https://www.instagram.com/hbonanzadogresort/',
    petabookPartner: false,
    shortDescription:
      'Herdade Bonanza é um resort canino em Lagos com alojamento, creche, treino e transporte, com suítes isoladas e piscina interior.',
    longDescription:
      'A Herdade Bonanza, situada em Lagos, oferece serviços de alojamento, cuidados de higiene, creche, aulas de treino e transporte para cães, com 43 suítes privadas revestidas para isolamento e acesso a piscina interior e áreas monitoradas.',
    services: 'Hotel canino',
    prices: 0,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0024-0024-0024-000000000024',
    name: 'Curti Dog',
    region: ['ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34'],
    address: 'Rua Casal da Curtinha 13 2530, Reguengo Grande',
    contact: '914819881',
    email: 'curti_dog@hotmail.com',
    website: null,
    facebook: 'https://www.facebook.com/CurtiDog18/?locale=pt_PT',
    instagram: 'https://www.instagram.com/curti_dog/',
    petabookPartner: true,
    shortDescription:
      'A Curti Dog oferece hospedagem, creche e estética para cães e gatos, com serviços de petshop, adestramento e transporte.',
    longDescription:
      'Estabelecida em 2018, a Curti Dog é uma empresa familiar que oferece serviços de hospedagem, creche e estética para cães e gatos, com boxes individuais e serviços de adestramento e transporte para consultas veterinárias.',
    services: 'Hotel canino',
    prices: 10,
    reservationEmail: 'curti_dog@hotmail.com',
    responsableName: '',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0025-0025-0025-000000000025',
    name: 'Hotel e Spa Animal VIP',
    region: ['ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34'],
    address: 'Rua da Escola 16, Travassós de Baixo, Viseu',
    contact: '924442759',
    email: 'animalvip@ivcevidensia.pt',
    website: 'https://www.animalvip.pt/hotel-spa/',
    facebook: 'https://www.facebook.com/centroveterinario.beiraalta',
    instagram: 'https://www.instagram.com/Animal_vip/',
    petabookPartner: false,
    shortDescription:
      'O Hotel e SPA Animal VIP oferece suites de luxo para cães e gatos com TV, webcam e videochamadas diárias, além de serviços de piscina, grooming e massagens.',
    longDescription:
      'Localizado em Travassós de Baixo, Viseu, o Hotel e SPA Animal VIP proporciona uma experiência de luxo para cães e gatos com suites equipadas com televisão, ventoinha e webcam, passeios diários em um parque vedado de 4000 m², além de serviços de grooming diário, massagens e outras comodidades, funcionando de segunda a sábado.',
    services: 'Hotel canino',
    prices: 0,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0026-0026-0026-000000000026',
    name: 'Trela Amarela',
    region: ['ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34'],
    address: 'Rua da Folha 35, Santarém',
    contact: '938503142',
    email: null,
    website: 'https://trelaamarela.pt/pet-hotel/',
    facebook: 'https://www.facebook.com/Trela.Amarela/?locale=pt_PT',
    instagram: 'https://www.instagram.com/atrelaamarela/',
    petabookPartner: false,
    shortDescription:
      'O Hotel d’A Trela Amarela oferece alojamento para cães e gatos com amplos espaços vedados, passeios diários e monitorização veterinária.',
    longDescription:
      'Situado numa zona rural a 5 minutos da A1 em Santarém, o Hotel d’A Trela Amarela dispõe de 20 boxes para cães e 10 para gatos, com dois passeios diários em um espaço de 15.000 m². Os check-ins ocorrem das 9h às 11h e os check-outs das 16h às 18h, com filmagens das brincadeiras para os donos.',
    services: 'Hotel canino',
    prices: 14,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  // Hotels from Alentejo:
  {
    uuid: '1a2b3c4d-0027-0027-0027-000000000027',
    name: 'Monte da Benviuda',
    region: ['d1a5a76f-7a8f-4b92-9a3f-abc1d1e2f345'],
    address: 'Monte da Benviuda, Alcaria Ruiva, Mértola',
    contact: '963187118',
    email: 'canilmontedabenviuda.blogspot.pt',
    website: null,
    facebook:
      'https://www.facebook.com/p/Canil-Monte-da-Benviuda-100063803253210/',
    instagram: 'https://www.instagram.com/canil.monte.da.benviuda/',
    petabookPartner: true,
    shortDescription:
      'Monte da Benviuda oferece alojamento tranquilo para cães com boxes individuais, parque de passeios e centro de estética canina.',
    longDescription:
      "Localizado em Mértola, o Hotel Canino 'Monte da Benviúda' oferece tratamento personalizado e um ambiente acolhedor, com boxes individuais, um parque para passeios e um centro de estética canina, proporcionando um espaço seguro para os animais.",
    services: 'Hotel canino',
    prices: 12,
    reservationEmail: 'Monte.da.benviuda@sapo.pt',
    responsableName: '',
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
  {
    uuid: '1a2b3c4d-0028-0028-0028-000000000028',
    name: 'Residência Canina e Felina',
    region: ['d1a5a76f-7a8f-4b92-9a3f-abc1d1e2f345'],
    address: 'Fonte Santa Estrada da Calçadinha, CP 219, Elvas',
    contact: '268622607',
    email: 'geral.pethotel@fortedelvas.pt',
    website: 'https://www.residenciacanina.pt/pt/canina.php',
    facebook:
      'https://www.facebook.com/residenciacaninafortedelvas/?locale=pt_PT',
    instagram: 'https://www.instagram.com/residenciacaninafelina/',
    petabookPartner: false,
    shortDescription:
      'Residência Canina e Felina Forte de Elvas oferece alojamento seguro para cães e gatos, com treinos e cuidados veterinários.',
    longDescription:
      'Localizada em Elvas, a Residência Canina e Felina Forte de Elvas é dedicada ao cuidado dos animais, oferecendo serviços de hospedagem, cuidados diários, treinos e serviços veterinários em um ambiente seguro e confortável.',
    services: 'Hotel canino',
    prices: 12,
    reservationEmail: null,
    responsableName: null,
    conditions: '',
    workingHours: '',
    images: '',
    checkInHours: '',
    checkOutHours: '',
    checkInDays: '',
    checkOutDays: '',
    restrictions: '',
  },
];

// Build an object keyed by the hotel uuid for easy lookup.
export const hotelObj: HotelData = hotelList.reduce((acc, hotel) => {
  acc[hotel.uuid] = hotel;
  return acc;
}, {} as HotelData);
