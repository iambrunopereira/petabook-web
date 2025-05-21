// attributes.ts

export interface Attribute {
	uuid: string;
	name: string;
	icon?: string;
	category?: string;
}

export interface AttributeData {
	[uuid: string]: Attribute;
}

export const attributeList: Attribute[] = [
	{ uuid: "7e8823fc-2014-47fa-8e63-dca6e0c4e91d", name: "Hotel canino" },
	{ uuid: "9b423b5a-9dd9-4ed8-a6f9-d2e0db8b77ae", name: "Estadia canina" },
	{ uuid: "e61b1532-50e0-47fa-85b5-43c2f97320b3", name: "Estadia familiar" },
	{
		uuid: "76131b59-d2b2-4c56-881b-ff531cc33e0c",
		name: "Clínica veterinária com estadias caninas",
	},
	{
		uuid: "e3fbe581-1a40-4b57-bdde-9d89e6cba730",
		name: "Quinta / Espaço rural",
	},
	{ uuid: "e19e989c-0875-4f90-b460-9bfb7e6f8f52", name: "Ambiente familiar" },
	{ uuid: "fba40be5-e83f-4989-9841-8d05bc147800", name: "Hotel urbano" },
	{ uuid: "fb9f5f2f-bd57-49b7-81de-82f3b182d8df", name: "Resort canino" },
	{ uuid: "293d0f88-40c9-4b5c-9016-f1f57044d803", name: "Alimentação" },
	{
		uuid: "2bb9621d-0f9e-42ce-9f44-058b90fa11c0",
		name: "Alojamento em casa do cuidador",
	},
	{ uuid: "a01b5bfb-96b6-44f3-8ce5-88057b826c07", name: "Boxes individuais" },
	{ uuid: "02414d3a-16c2-4b47-b33f-83a4cfb20884", name: "Suites privadas" },
	{ uuid: "7cc9c6f6-60ea-48db-8c41-76aa95b8cc7f", name: "Camas confortáveis" },
	{ uuid: "289a5246-3605-4f14-b3c3-05a678c89153", name: "Música ambiente" },
	{
		uuid: "d89c981f-3d5c-4e75-aeb4-5abdc7506f92",
		name: "Serviços veterinários",
	},
	{ uuid: "c0c4d430-093e-4f77-8f78-9ae35a53e2c7", name: "Ventilação natural" },
	{ uuid: "8481d85b-bd58-44e1-a9cf-3f325c1cc47e", name: "Iluminação natural" },
	{ uuid: "947b8882-978e-4ad4-bc96-712dd1c4b90b", name: "Espaços verdes" },
	{ uuid: "7e6bbd64-267c-4010-9c2c-69d6f4a505f2", name: "Parque vedado" },
	{ uuid: "70276d17-5b3d-4867-a2aa-823b37c9f06b", name: "Piscina para cães" },
	{
		uuid: "394408e4-5f5e-49f3-bfa3-cd0b1b457bcc",
		name: "Envio de fotografias",
	},
	{
		uuid: "3f53fcf0-c65b-49fc-8655-94dba4df7fd5",
		name: "Zona de recreio ao ar livre",
	},
	{
		uuid: "7696cfc9-d1c9-4652-94f9-5f3b843d1ff2",
		name: "Passeios e trilhos diários",
	},
	{
		uuid: "b4c10c75-24f7-4b2c-b42c-3e2d6c73cf33",
		name: "Zona com sombra natural",
	},
	{
		uuid: "a01f9e5a-4f14-4a87-96e4-735c9d152a08",
		name: "Espaço para corridas livres",
	},
	{ uuid: "41e40af0-c5c1-4e89-974f-9736f36fcfd3", name: "Vigilância 24h" },
	{
		uuid: "16cf2f56-9d5f-46a2-a187-0a51b324f3f1",
		name: "CCTV / câmaras de segurança",
	},
	{
		uuid: "a3c89715-f4d6-4761-846f-24961b6f0b4a",
		name: "Presença humana permanente",
	},
	{ uuid: "1cfb882f-5a8e-407b-89e5-5f65bc514c3a", name: "Transporte" },
	{
		uuid: "8e5951f3-5e15-4624-b0de-6a40a27d227a",
		name: "Serviços de banhos e tosquias",
	},
	{
		uuid: "9b980e69-9b84-4460-b6c2-1164565b5e53",
		name: "Adestramento / treino canino",
	},
	{
		uuid: "be71c18c-51d1-4cb1-85b4-292cc3f13498",
		name: "Possibilidade de levar a própria ração",
	},
	{
		uuid: "ee27b9b6-2227-4f04-93be-932cdfa9b1cc",
		name: "Administração de medicação",
	},
	{
		uuid: "df02c76f-ffed-4c21-b3c2-bf1c86aa2591",
		name: "Socialização com outros cães",
	},
	{
		uuid: "c05d3c91-0c8e-4ab1-9b5e-d26fae6e816f",
		name: "Ambiente sem jaulas (cage-free)",
	},
	{
		uuid: "15b1368f-6b57-49a9-89cd-e4a37f774e68",
		name: "Equipa com formação em comportamento animal",
	},
	{
		uuid: "fbf1a6aa-f7c9-4c3d-847c-9df5d4c17000",
		name: "Hotel gerido por família",
	},
	{ uuid: "08962d7e-129e-4031-8238-b38739081635", name: "Staff certificado" },
	{
		uuid: "c2959df8-f5b0-4a3d-b7e6-4d49b607c961",
		name: "Localização rural tranquila",
	},
	{
		uuid: "c2959df8-f5b0-4a3d-b7e6-4d49b607x123",
		name: "Ar condicionado",
	},
	{
		uuid: "c2959df8-f5b0-4a3d-b7e6-4d49b60z432",
		name: "Perto do centro",
	},
];

export const attributeObj: AttributeData = attributeList.reduce((acc, attr) => {
	acc[attr.uuid] = attr;
	return acc;
}, {} as AttributeData);
