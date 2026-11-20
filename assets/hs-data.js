/* 17TRACK HS Code Lookup — demo dataset (mock, not an official tariff source) */
/* ---------------------------------------------------------
     Demo dataset. Mock content only, not an official tariff source.
     --------------------------------------------------------- */

  var HS_ENTRIES = [
    {
      code: '010121',
      rank: -3,
      tags: {},
      chapter: { num: '01', title: 'Live animals' },
      heading: { num: '0101', title: 'Horses, asses, mules and hinnies, live' },
      sub: { title: 'Pure-bred breeding animals' },
      short: 'Pure-bred breeding horses, live',
      plain: 'Live horses kept for breeding rather than racing, work or slaughter. The breeding register is what places the animal in this subheading instead of the general horse line.',
      verify: [
        'The animal is alive when it crosses the border',
        'Pure-bred breeding stock, with papers from a stud book',
        'Species is a horse, ass, mule or hinny'
      ],
      detail: {
        build: 'Chapter 01 covers live animals. Heading 0101 covers horses and related animals. Inside that heading, 010121 is the pure-bred breeding line.',
        mixup: 'Horses for racing, riding or work normally sit in 010129. Once the animal is slaughtered and chilled, the goods move to chapter 02.',
        note: 'Carry the stud book or breeding certificate with the shipment. The document is what supports this subheading.'
      },
      terms: ['live horse', 'breeding horse', 'pure bred horse', 'horse', 'live animal', 'mare', 'stallion', 'foal']
    },
    {
      code: '010229',
      rank: -2,
      tags: {},
      chapter: { num: '01', title: 'Live animals' },
      heading: { num: '0102', title: 'Bovine animals, live' },
      sub: { title: 'Other than pure-bred breeding animals' },
      short: 'Live cattle, other than pure-bred breeding animals',
      plain: 'Live cattle that are not pure-bred breeding stock, whether they are going to a feedlot, to pasture or to a slaughterhouse later.',
      verify: [
        'The animal is alive when it crosses the border',
        'Not pure-bred breeding stock',
        'Species is bovine: cattle, oxen or buffalo'
      ],
      detail: {
        build: 'Heading 0102 covers live bovine animals. 010229 is the residual line for cattle that are not pure-bred breeding animals.',
        mixup: 'Pure-bred breeding cattle sit in 010221. Chilled or frozen beef leaves chapter 01 for chapter 02.',
        note: 'Age, weight and intended use are usually asked for on the veterinary certificate.'
      },
      terms: ['live cattle', 'cattle', 'cow', 'bull', 'live bovine', 'ox', 'buffalo']
    },
    {
      code: '010511',
      rank: -1,
      tags: {},
      chapter: { num: '01', title: 'Live animals' },
      heading: { num: '0105', title: 'Poultry, live, of the species Gallus domesticus, ducks, geese, turkeys and chickens' },
      sub: { title: 'Fowls of the species Gallus domesticus, weighing not more than 185 g' },
      short: 'Live fowls (Gallus domesticus) weighing not more than 185 g',
      plain: 'Day-old and very young chicks of the common domestic fowl, shipped live and under 185 grams each.',
      verify: [
        'Live birds, not hatching eggs',
        'Species is Gallus domesticus',
        'Each bird weighs 185 g or less'
      ],
      detail: {
        build: 'Heading 0105 covers live poultry. 010511 is the line for very young fowls of Gallus domesticus under 185 g.',
        mixup: 'Heavier live fowls move to 010594. Hatching eggs stay in 0407 rather than chapter 01.',
        note: 'Weight is checked per bird, and the veterinary certificate usually states the flock of origin.'
      },
      terms: ['chicks', 'day old chicks', 'live chicken', 'poultry', 'baby chick', 'fowl', 'live bird']
    },
    {
      code: '030111',
      rank: 0,
      tags: {},
      chapter: { num: '03', title: 'Fish and crustaceans, molluscs and other aquatic invertebrates' },
      heading: { num: '0301', title: 'Live fish' },
      sub: { title: 'Ornamental fish' },
      short: 'Live ornamental fish',
      plain: 'Live fish kept for aquariums rather than for food. The ornamental use, not the species alone, decides this line.',
      verify: [
        'Fish are alive at the time of shipment',
        'Intended for aquariums or ornamental keeping',
        'Not sold as food fish'
      ],
      detail: {
        build: 'Heading 0301 covers live fish. 030111 is the ornamental line, used for aquarium trade.',
        mixup: 'Live food fish sit in 0301 11 to 0301 99 other lines, and chilled or frozen fish move to 0302 and 0303.',
        note: 'Species names are usually declared, and some species need an additional permit.'
      },
      terms: ['live fish', 'ornamental fish', 'aquarium fish', 'koi', 'goldfish']
    },
    { code: '150910', rank: -1, tags: {},
      chapter: { num: '15', title: 'Animal or vegetable fats and oils and their cleavage products' },
      heading: { num: '1509', title: 'Olive oil and its fractions, whether or not refined, but not chemically modified' },
      sub: { title: 'Virgin oils' },
      short: 'Virgin olive oil',
      plain: 'Oil pressed from olives and not chemically refined. Virgin is the pressed grade; refined olive oil sits in the same heading under a different line.',
      verify: ['Obtained from olives only', 'Not chemically refined', 'Free acidity within the virgin range'],
      detail: { build: 'Chapter 15 covers fats and oils. Heading 1509 covers olive oil, and 150910 is the virgin grade.', mixup: 'Refined olive oil is 150990. Blends with other oils move to the heading of that oil.', note: 'Acidity is usually stated on the certificate of analysis.' },
      terms: ['olive oil', 'virgin olive oil', 'extra virgin olive oil'] },
    { code: '160100', rank: 0, tags: {},
      chapter: { num: '16', title: 'Preparations of meat, of fish or of crustaceans, molluscs or other aquatic invertebrates' },
      heading: { num: '1601', title: 'Sausages and similar products, of meat, meat offal, blood or insects; food preparations based on these products' },
      sub: { title: 'Sausages and similar products' },
      short: 'Sausages and similar products, of meat, meat offal or blood',
      plain: 'Prepared meat in a casing, or a product shaped the same way, whether fresh, chilled or frozen. The meat has to be prepared, not just cut.',
      verify: ['Meat, offal or blood is the main ingredient', 'Shaped in a casing or similar form', 'Prepared or preserved, not raw cuts'],
      detail: { build: 'Chapter 16 covers prepared meat. Heading 1601 is the sausage heading and 160100 has no further split.', mixup: 'Raw meat cuts stay in chapter 02; cooked ham without a casing usually sits in 1602.', note: 'Meat content and species are declared per 100 g.' },
      terms: ['sausage', 'sausages', 'cured meat', 'hot dog'] },
    { code: '250100', rank: 1, tags: {},
      chapter: { num: '25', title: 'Salt; sulfur; earths and stone; plastering materials, lime and cement' },
      heading: { num: '2501', title: 'Salt (including table salt and denatured salt) and pure sodium chloride' },
      sub: { title: 'Salt and pure sodium chloride' },
      short: 'Salt, including table salt, and pure sodium chloride',
      plain: 'Salt for food, industry or de-icing. Table salt and crude solar salt share the heading; grade and purity decide the local row.',
      verify: ['Sodium chloride is the product', 'Not a prepared seasoning blend', 'Grade or purity stated'],
      detail: { build: 'Chapter 25 covers mineral products. Heading 2501 covers salt and pure sodium chloride.', mixup: 'Seasoning blends and salt with added flavourings move to chapter 21.', note: 'Iodised or denatured salt stays in this heading.' },
      terms: ['salt', 'table salt', 'sodium chloride', 'sea salt'] },
    { code: '280700', rank: 2, tags: {},
      chapter: { num: '28', title: 'Inorganic chemicals; organic or inorganic compounds of precious metals' },
      heading: { num: '2807', title: 'Sulfuric acid; oleum' },
      sub: { title: 'Sulfuric acid; oleum' },
      short: 'Sulfuric acid and oleum',
      plain: 'A basic industrial acid used in batteries, fertilisers and metal treatment. Oleum is the more concentrated form of the same product.',
      verify: ['Sulfuric acid or oleum, not a mixture', 'Concentration stated', 'Packaging meets dangerous goods rules'],
      detail: { build: 'Chapter 28 covers inorganic chemicals. Heading 2807 covers sulfuric acid and oleum.', mixup: 'Spent acid and acid mixtures usually fall in 3824.', note: 'Transport documents carry the UN number and concentration.' },
      terms: ['sulfuric acid', 'sulphuric acid', 'oleum', 'battery acid'] },
    { code: '420221', rank: 3, tags: {},
      chapter: { num: '42', title: 'Articles of leather; saddlery and harness; travel goods, handbags and similar containers' },
      heading: { num: '4202', title: 'Trunks, suitcases, handbags and similar containers' },
      sub: { title: 'With outer surface of leather or of composition leather' },
      short: 'Handbags with outer surface of leather or composition leather',
      plain: 'A bag carried by hand or on the shoulder with a leather outside. The outer material decides this line, not the lining or the fittings.',
      verify: ['Outer surface is leather or composition leather', 'A handbag or shoulder bag', 'Not a suitcase or a rigid case'],
      detail: { build: 'Chapter 42 covers leather goods. Heading 4202 covers containers, and 420221 is the handbag line with a leather outer surface.', mixup: 'Textile and plastic outers sit in 420222 and 420232. Suitcases move to 420211.', note: 'Lining and hardware do not change the line.' },
      terms: ['handbag', 'leather bag', 'shoulder bag', 'purse'] },
    { code: '440711', rank: 4, tags: {},
      chapter: { num: '44', title: 'Wood and articles of wood; wood charcoal' },
      heading: { num: '4407', title: 'Wood sawn or chipped lengthwise, sliced or peeled, over 6 mm thick' },
      sub: { title: 'Coniferous' },
      short: 'Pine wood sawn or chipped, over 6 mm thick',
      plain: 'Pine boards and planks produced by sawing, thicker than 6 mm. The species line matters here as much as the thickness.',
      verify: ['Coniferous wood of the pine species', 'Sawn or chipped, not planed or sanded', 'Over 6 mm thick'],
      detail: { build: 'Chapter 44 covers wood. Heading 4407 covers sawn wood, and 440711 is the pine line.', mixup: 'Planed or moulded boards move to 4409; plywood is 4412.', note: 'Phytosanitary treatment is usually required for lumber and wood packaging.' },
      terms: ['pine', 'lumber', 'sawn wood', 'timber', 'wood board'] },
    { code: '481910', rank: 5, tags: {},
      chapter: { num: '48', title: 'Paper and paperboard; articles of paper pulp, of paper or of paperboard' },
      heading: { num: '4819', title: 'Cartons, boxes, cases, bags and other packing containers, of paper, paperboard, cellulose wadding or webs' },
      sub: { title: 'Cartons, boxes and cases, of corrugated paper or paperboard' },
      short: 'Cartons, boxes and cases, of corrugated paper or paperboard',
      plain: 'Shipping cartons made from corrugated board. The corrugation is what separates this line from folding boxes of solid board.',
      verify: ['Made of corrugated paper or paperboard', 'A carton, box or case', 'Not a folding carton of solid board'],
      detail: { build: 'Chapter 48 covers paper products. Heading 4819 covers packing containers, and 481910 is the corrugated line.', mixup: 'Folding cartons of solid board sit in 481920; printed labels are 4821.', note: 'Printed brand information does not move a shipping carton out of this line.' },
      terms: ['carton', 'corrugated box', 'shipping box', 'paperboard box', 'packaging box'] },
    { code: '710812', rank: 6, tags: {},
      chapter: { num: '71', title: 'Natural or cultured pearls, precious or semi-precious stones, precious metals' },
      heading: { num: '7108', title: 'Gold, unwrought or semi-manufactured, or in powder form' },
      sub: { title: 'Non-monetary' },
      short: 'Gold, non-monetary, unwrought',
      plain: 'Gold in bar, grain or powder form that is not held as currency. Monetary gold is classified elsewhere and carries different rules.',
      verify: ['Gold content, not a finished article', 'Non-monetary form', 'Fineness stated'],
      detail: { build: 'Chapter 71 covers precious metals. Heading 7108 covers gold, and 710812 is the unwrought, non-monetary line.', mixup: 'Gold jewellery is 7113; monetary gold is 7105.', note: 'Fineness and weight are declared, and many markets require a licence.' },
      terms: ['gold', 'gold bar', 'bullion', 'unwrought gold'] },
    { code: '720839', rank: 7, tags: {},
      chapter: { num: '72', title: 'Iron and steel' },
      heading: { num: '7208', title: 'Flat-rolled products of iron or non-alloy steel, of a width of 600 mm or more, hot-rolled, not clad' },
      sub: { title: 'In coils, of a thickness of less than 3 mm' },
      short: 'Hot-rolled flat steel in coils, under 3 mm thick',
      plain: 'Hot-rolled coil steel for further processing, thinner than 3 mm and neither clad nor coated.',
      verify: ['Non-alloy steel', 'Hot-rolled and in coils', 'Under 3 mm thick, not clad'],
      detail: { build: 'Chapter 72 covers iron and steel. Heading 7208 covers hot-rolled flat products, and 720839 is the under-3 mm coil line.', mixup: 'Pickled or coated coil moves to 7210 or 7212; alloy steel leaves for 7225.', note: 'Thickness and width are checked against the mill certificate.' },
      terms: ['steel coil', 'hot rolled steel', 'steel sheet', 'hrc'] },
    { code: '860900', rank: 8, tags: {},
      chapter: { num: '86', title: 'Railway locomotives, track fixtures; traffic signalling equipment of all kinds' },
      heading: { num: '8609', title: 'Containers, including containers for the transport of fluids, specially designed and equipped for carriage by one or more modes of transport' },
      sub: { title: 'Containers for transport' },
      short: 'Containers for the transport of goods, including refrigerated containers',
      plain: 'Freight containers built to move between road, rail and ship. They are transport equipment here, not packaging.',
      verify: ['Designed and fitted for multimodal transport', 'Capacity and fittings stated', 'Not a vehicle body'],
      detail: { build: 'Chapter 86 covers railway and transport equipment. Heading 8609 covers containers, and 860900 has no further split.', mixup: 'Trailers and semi-trailers are 8716.', note: 'Container number and CSC plate appear on the bill of lading.' },
      terms: ['container', 'shipping container', 'freight container', 'reefer'] },
    { code: '901831', rank: 9, tags: {},
      chapter: { num: '90', title: 'Optical, photographic, measuring, medical or surgical instruments and apparatus' },
      heading: { num: '9018', title: 'Instruments and appliances used in medical, surgical, dental or veterinary sciences' },
      sub: { title: 'Syringes, with or without needles' },
      short: 'Syringes, with or without needles',
      plain: 'Medical syringes in plastic or glass, with or without a needle fitted. The needle on its own is a different line.',
      verify: ['A syringe body, with or without needle', 'Medical or laboratory use', 'Sterility stated where required'],
      detail: { build: 'Chapter 90 covers medical instruments. Heading 9018 covers them, and 901831 is the syringe line.', mixup: 'Needles alone are 901832; infusion sets are 901839.', note: 'Sterile single-use syringes usually need a medical device registration.' },
      terms: ['syringe', 'medical syringe', 'injection', 'needle syringe'] },
    { code: '930400', rank: 10, tags: {},
      chapter: { num: '93', title: 'Arms and ammunition; parts and accessories thereof' },
      heading: { num: '9304', title: 'Other arms, for example spring, air or gas guns and pistols' },
      sub: { title: 'Other arms' },
      short: 'Other arms, such as spring, air or gas guns and pistols',
      plain: 'Non-firearm arms such as air rifles and gas pistols used for sport or training. Firearms that use an explosive charge are separate headings.',
      verify: ['Operates by spring, air or gas', 'Not a firearm using explosive propellant', 'Sporting or training use stated'],
      detail: { build: 'Chapter 93 covers arms and ammunition. Heading 9304 covers other arms and 930400 has no split.', mixup: 'Firearms are 9301 and 9302; parts of arms are 9305.', note: 'Many markets license air guns, and the energy limit differs by country.' },
      terms: ['air rifle', 'air gun', 'pellet gun', 'airsoft'] },
    { code: '970300', rank: 11, tags: {},
      chapter: { num: '97', title: 'Works of art, collectors\u2019 pieces and antiques' },
      heading: { num: '9703', title: 'Original sculptures and statuary, in any material' },
      sub: { title: 'Original sculptures' },
      short: 'Original sculptures and statuary, in any material',
      plain: 'A one-off sculpture made by the artist, in any material. Reproductions and mass-produced decorative pieces are excluded.',
      verify: ['Original work, not a reproduction', 'Sculpture or statuary', 'Artist and date documented'],
      detail: { build: 'Chapter 97 covers works of art. Heading 9703 covers original sculptures, and 970300 has no split.', mixup: 'Paintings are 9701; reproductions fall with prints or with 9701 depending on the process.', note: 'Provenance and artist documentation travel with the piece.' },
      terms: ['sculpture', 'statue', 'art', 'original sculpture'] },
    { code: '010129', rank: -4, tags: {},
      chapter: { num: '01', title: 'Live animals' },
      heading: { num: '0101', title: 'Horses, asses, mules and hinnies, live' },
      sub: { title: 'Other' },
      short: 'Live horses, other than pure-bred breeding animals',
      plain: 'Horses shipped alive for racing, riding, work or slaughter. Without accepted breeding papers they fall outside the pure-bred line.',
      verify: ['The animal is alive', 'Not pure-bred breeding stock', 'Intended use declared'],
      detail: { build: 'Heading 0101 covers live horses. 010129 is the residual line for everything that is not pure-bred breeding stock.', mixup: 'Pure-bred breeding horses are 010121; chilled or frozen meat leaves chapter 01.', note: 'Travel and health documents list the animal and its declared use.' },
      terms: ['racehorse', 'riding horse', 'live horse', 'horse'] },
    { code: '010221', rank: -3, tags: {},
      chapter: { num: '01', title: 'Live animals' },
      heading: { num: '0102', title: 'Bovine animals, live' },
      sub: { title: 'Pure-bred breeding animals' },
      short: 'Pure-bred breeding cattle, live',
      plain: 'Cattle kept for breeding and backed by a herd book or pedigree record. Non-breeding cattle sit in the other line of the same heading.',
      verify: ['The animal is alive', 'Pure-bred breeding stock with pedigree', 'Species is bovine'],
      detail: { build: 'Heading 0102 covers live cattle. 010221 is the pure-bred breeding line.', mixup: 'Other live cattle are 010229; meat moves to chapter 02.', note: 'Pedigree papers and the veterinary certificate travel with the animals.' },
      terms: ['breeding cattle', 'pure bred cattle', 'bull', 'cow', 'live cattle'] },
    { code: '020130', rank: -2, tags: {},
      chapter: { num: '02', title: 'Meat and edible meat offal' },
      heading: { num: '0201', title: 'Meat of bovine animals, fresh or chilled' },
      sub: { title: 'Boneless' },
      short: 'Fresh or chilled boneless meat of bovine animals',
      plain: 'Beef cuts with the bone removed, shipped fresh or chilled rather than frozen. Boneless is the distinction that matters at six digits.',
      verify: ['Species is bovine', 'Fresh or chilled, not frozen', 'Boneless cuts'],
      detail: { build: 'Chapter 02 covers meat. Heading 0201 covers fresh or chilled beef, and 020130 is the boneless line.', mixup: 'Frozen boneless beef is 020230; carcasses are 020110.', note: 'Cold-chain temperature and slaughterhouse approval are checked at the border.' },
      terms: ['beef', 'fresh beef', 'boneless beef', 'chilled beef'] },
    { code: '040210', rank: -1, tags: {},
      chapter: { num: '04', title: 'Dairy produce; birds\u2019 eggs; natural honey' },
      heading: { num: '0402', title: 'Milk and cream, concentrated or containing added sugar' },
      sub: { title: 'In powder, granules or other solid forms, of a fat content not exceeding 1.5%' },
      short: 'Milk and cream in powder, fat content 1.5% or less',
      plain: 'Skimmed milk powder and similar dried dairy solids. Fat content is the dividing line inside heading 0402.',
      verify: ['Milk or cream base', 'Powder or other solid form', 'Fat content 1.5% or less by weight'],
      detail: { build: 'Chapter 04 covers dairy. Heading 0402 covers concentrated milk, and 040210 is the low-fat powder line.', mixup: 'Whole milk powder sits in 040221 or 040229 depending on added sugar.', note: 'Moisture and fat analysis usually accompanies the shipment.' },
      terms: ['milk powder', 'skimmed milk powder', 'dairy powder', 'milk solids'] },
    { code: '040900', rank: 0, tags: {},
      chapter: { num: '04', title: 'Dairy produce; birds\u2019 eggs; natural honey' },
      heading: { num: '0409', title: 'Natural honey' },
      sub: { title: 'Natural honey' },
      short: 'Natural honey',
      plain: 'Honey produced by bees, in any packaging. Blends with syrup or added sugar are excluded and fall elsewhere.',
      verify: ['Natural honey, not a syrup blend', 'No added sugar', 'Packaging and origin stated'],
      detail: { build: 'Heading 0409 covers natural honey, and 040900 has no further split at six digits.', mixup: 'Sugar confectionery and syrups sit in chapter 17.', note: 'Pollen analysis is sometimes requested to confirm botanical origin.' },
      terms: ['honey', 'natural honey', 'bee honey'] },
    { code: '050510', rank: 1, tags: {},
      chapter: { num: '05', title: 'Products of animal origin, not elsewhere specified' },
      heading: { num: '0505', title: 'Skins and other parts of birds, with their feathers or down' },
      sub: { title: 'Feathers of a kind used for stuffing; down' },
      short: 'Feathers used for stuffing, and down',
      plain: 'Cleaned feathers and down for pillows, jackets and sleeping bags. The stuffing use separates this line from decorative feathers.',
      verify: ['Feathers or down', 'Cleaned and treated', 'Intended for stuffing or padding'],
      detail: { build: 'Chapter 05 covers animal by-products. Heading 0505 covers feathers and down, and 050510 is the stuffing line.', mixup: 'Feathers for ornament or millinery are 6701.', note: 'Washed and sterilised down is usually required for bedding and apparel.' },
      terms: ['feathers', 'down', 'stuffing', 'duck down'] },
    {
      code: '610910',
      rank: 1,
      tags: { knitted: true },
      chapter: { num: '61', title: 'Articles of apparel and clothing accessories, knitted or crocheted' },
      heading: { num: '6109', title: 'T-shirts, singlets and other vests, knitted or crocheted' },
      sub: { title: 'Of cotton' },
      short: 'T-shirts, singlets and other vests, of cotton, knitted or crocheted',
      plain: 'The standard subheading for a cotton T-shirt or vest made from knitted jersey fabric. The cotton content is what places it here rather than in the man-made fibre line of the same heading.',
      verify: [
        'Knitted or crocheted construction, not woven',
        'Cotton predominates by weight',
        'A T-shirt, singlet or vest rather than a buttoned shirt'
      ],
      detail: {
        build: 'Chapter 61 covers knitted apparel. Heading 6109 covers T-shirts, singlets and other vests. Inside that heading, 610910 is the cotton line.',
        mixup: 'A woven cotton top sits in chapter 62 under heading 6205 or 6206. A cotton and polyester blend may leave 610910 when the synthetic fibre predominates by weight.',
        note: 'Printing or embroidery on the garment usually does not move it out of this subheading.'
      },
      terms: ['t shirt', 'tshirt', 'tee', 'cotton t shirt', 'singlet', 'vest top', 'tank top', 'cotton tee']
    },
    {
      code: '620520',
      rank: 2,
      tags: { woven: true },
      chapter: { num: '62', title: 'Articles of apparel and clothing accessories, not knitted or crocheted' },
      heading: { num: '6205', title: 'Men\u2019s or boys\u2019 shirts' },
      sub: { title: 'Of cotton' },
      short: 'Men\u2019s or boys\u2019 shirts, of cotton',
      plain: 'A woven cotton shirt with a full front opening, cut for men or boys. Woven cotton tops fall in chapter 62, which is why the knitted-or-woven answer changes the code.',
      verify: [
        'Woven fabric, not knitted jersey',
        'Made for men or boys',
        'Full front opening: a shirt rather than a T-shirt'
      ],
      detail: {
        build: 'Chapter 62 covers apparel that is not knitted. Heading 6205 is the men\u2019s and boys\u2019 shirt heading, and 620520 is its cotton line.',
        mixup: 'A T-shirt shape in knitted cotton belongs to 610910. A shirt cut for women or girls belongs to 6206, not here.',
        note: 'Sleeve length does not change the subheading, but the wearer does.'
      },
      terms: ['shirt', 't shirt', 'cotton t shirt', 'button up', 'button down', 'dress shirt', 'mens shirt', 'woven shirt', 'linen shirt']
    },
    {
      code: '620630',
      rank: 3,
      tags: { woven: true },
      chapter: { num: '62', title: 'Articles of apparel and clothing accessories, not knitted or crocheted' },
      heading: { num: '6206', title: 'Women\u2019s or girls\u2019 blouses, shirts and shirt-blouses' },
      sub: { title: 'Of cotton' },
      short: 'Women\u2019s or girls\u2019 blouses, shirts and shirt-blouses, of cotton',
      plain: 'The women\u2019s and girls\u2019 counterpart to 620520. The wearer is part of the classification, so the same woven cotton top can land in a different heading.',
      verify: [
        'Woven fabric',
        'Cut for women or girls',
        'Blouse or shirt shape, with or without sleeves'
      ],
      detail: {
        build: 'Heading 6206 mirrors the men\u2019s shirt heading for women and girls. 620630 is the cotton line.',
        mixup: 'A knitted cotton top for women is classified by construction first, in 610910 or 611020.',
        note: 'Whether the garment is called a blouse or a shirt does not change the heading.'
      },
      terms: ['blouse', 'womens shirt', 'ladies top', 'woven blouse', 'shirt blouse', 'women shirt']
    },
    {
      code: '611020',
      rank: 4,
      tags: { knitted: true },
      chapter: { num: '61', title: 'Articles of apparel and clothing accessories, knitted or crocheted' },
      heading: { num: '6110', title: 'Jerseys, pullovers, cardigans, waistcoats and similar articles, knitted or crocheted' },
      sub: { title: 'Of cotton' },
      short: 'Jerseys, pullovers, cardigans and similar articles, of cotton, knitted or crocheted',
      plain: 'Cotton knit tops with sleeves that are not T-shirts, such as sweatshirts, pullovers, hoodies and cardigans, usually land here. The garment shape matters more than the fabric weight.',
      verify: [
        'Knitted or crocheted',
        'Cotton predominates by weight',
        'Pullover, cardigan or sweatshirt shape rather than a T-shirt'
      ],
      detail: {
        build: 'Heading 6110 gathers knitted garments that are pulled on over the head or buttoned at the front, excluding T-shirts.',
        mixup: 'A hoodie with a full-length zip can still sit here. A woven jacket would move to chapter 62.',
        note: 'Hood, pocket and zip details normally stay inside the same subheading.'
      },
      terms: ['hoodie', 'sweatshirt', 'pullover', 'sweater', 'jumper', 'cardigan', 'knitted top', 'knit top']
    },
    {
      code: '691110',
      rank: 2,
      tags: { porcelain: true },
      chapter: { num: '69', title: 'Ceramic products' },
      heading: { num: '6911', title: 'Tableware and kitchenware, of porcelain or china' },
      sub: { title: 'Tableware and kitchenware, of porcelain or china' },
      short: 'Tableware and kitchenware, of porcelain or china',
      plain: 'Mugs, plates and bowls with a porcelain or china body. Porcelain is a specific ceramic, so the body material decides between this subheading and 691200.',
      verify: [
        'Porcelain or china body',
        'Made for table or kitchen use',
        'Not a decorative or ornamental ceramic article'
      ],
      detail: {
        build: 'Chapter 69 covers ceramic products. Heading 6911 is the porcelain and china line, which carries a single six-digit subheading.',
        mixup: 'Stoneware and earthenware belong to 691200. A glass mug belongs to chapter 70.',
        note: 'Glaze colour and pattern do not change the subheading.'
      },
      terms: ['porcelain', 'porcelain mug', 'china mug', 'porcelain plate', 'porcelain bowl', 'fine china', 'porcelain tableware', 'ceramic mug', 'mug', 'ceramic', 'ceramic plate', 'ceramic bowl']
    },
    {
      code: '691200',
      rank: 1,
      tags: { ceramic: true },
      chapter: { num: '69', title: 'Ceramic products' },
      heading: { num: '6912', title: 'Ceramic tableware, kitchenware and other household articles, other than of porcelain or china' },
      sub: { title: 'Other' },
      short: 'Ceramic tableware, kitchenware and other household articles, other than of porcelain or china',
      plain: 'Stoneware, earthenware and other ceramics used in the kitchen or on the table, as long as the body is not porcelain or china.',
      verify: [
        'Ceramic body that is not porcelain or china',
        'Table or kitchen use',
        'Decoration applied to the body rather than being the product'
      ],
      detail: {
        build: 'Heading 6912 is the residual ceramic tableware heading, and 691200 covers the articles themselves.',
        mixup: 'A porcelain mug belongs to 691110. A ceramic figurine meant for display is not tableware.',
        note: 'Whether a piece is handmade or moulded does not change the subheading.'
      },
      terms: ['ceramic', 'ceramic mug', 'mug', 'stoneware', 'pottery', 'ceramic plate', 'ceramic bowl', 'earthenware', 'ceramic tableware']
    },
    {
      code: '392410',
      rank: 5,
      tags: {},
      chapter: { num: '39', title: 'Plastics and articles thereof' },
      heading: { num: '3924', title: 'Tableware, kitchenware and other household articles, of plastics' },
      sub: { title: 'Tableware and kitchenware' },
      short: 'Tableware and kitchenware, of plastics',
      plain: 'Plastic cups, bowls, lunch boxes and cutlery. The material decides this one: the same shape in ceramic goes to chapter 69.',
      verify: [
        'Plastic body',
        'Table or kitchen use',
        'Not a container designed for transport or storage'
      ],
      detail: {
        build: 'Heading 3924 covers household plastics, and the subheading narrows it to tableware and kitchenware.',
        mixup: 'A plastic crate or storage box belongs to a different heading in the same chapter.',
        note: 'Colour and printing do not change the subheading.'
      },
      terms: ['plastic cup', 'plastic mug', 'plastic tableware', 'plastic bowl', 'lunch box', 'plastic cutlery', 'plastic plate']
    },
    {
      code: '640399',
      rank: 6,
      tags: {},
      chapter: { num: '64', title: 'Footwear, gaiters and the like; parts of such articles' },
      heading: { num: '6403', title: 'Footwear with outer soles of rubber, plastics or leather and uppers of leather' },
      sub: { title: 'Other footwear' },
      short: 'Footwear with outer soles of rubber, plastics or leather and uppers of leather, other',
      plain: 'Leather-upper shoes and boots that are not sports or protective footwear. The upper material and the outer sole are the first two details customs looks at.',
      verify: [
        'Upper is leather',
        'Outer sole is rubber, plastics or leather',
        'Not sports footwear or protective footwear'
      ],
      detail: {
        build: 'Heading 6403 is defined by the upper being leather. The subheading then separates sports, protective and other footwear.',
        mixup: 'Textile-upper sneakers belong to 6404, and rubber or plastic uppers belong to 6402.',
        note: 'Brand and retail price do not affect the subheading.'
      },
      terms: ['leather shoes', 'leather boots', 'sneakers', 'trainers', 'shoes', 'boots', 'leather footwear']
    },
    {
      code: '420292',
      rank: 7,
      tags: {},
      chapter: { num: '42', title: 'Leather goods, travel goods and similar containers' },
      heading: { num: '4202', title: 'Trunks, suitcases, bags and similar containers' },
      sub: { title: 'With outer surface of plastic sheeting or textile materials' },
      short: 'Bags and containers with outer surface of plastic sheeting or textile materials',
      plain: 'Backpacks, tote bags and travel bags whose outer surface is textile or plastic sheeting. The outer material, not the lining, decides the subheading.',
      verify: [
        'Outer surface is textile or plastic sheeting',
        'Designed to carry goods',
        'Not a leather handbag or a rigid case'
      ],
      detail: {
        build: 'Heading 4202 covers travel goods and similar containers. The subheading follows the material of the outer surface.',
        mixup: 'A leather handbag sits in 4202 as well but under a different material line. A rigid tool case may be classified by its material instead.',
        note: 'Straps, wheels and pockets do not change the subheading.'
      },
      terms: ['backpack', 'rucksack', 'tote bag', 'travel bag', 'duffel bag', 'shopping bag', 'bag']
    },
    {
      code: '950300',
      rank: 8,
      tags: {},
      chapter: { num: '95', title: 'Toys, games and sports requisites' },
      heading: { num: '9503', title: 'Wheeled toys, dolls, other toys and construction sets' },
      sub: { title: 'Other toys' },
      short: 'Tricycles, scooters, dolls and other toys; construction sets',
      plain: 'Most children\u2019s toys, including dolls, plush toys, building blocks and puzzles, are grouped in this single subheading. Being designed for play matters more than the material.',
      verify: [
        'Designed for the amusement of children',
        'Not a video game or a collectors\u2019 item',
        'No motor or electronic function that changes the classification'
      ],
      detail: {
        build: 'Heading 9503 gathers wheeled toys, dolls, construction sets and other toys under one six-digit subheading.',
        mixup: 'A toy with a motor or a screen may be classified by that function instead of as a toy.',
        note: 'Age grading alone does not change the subheading.'
      },
      terms: ['toy', 'toys', 'doll', 'plush toy', 'puzzle', 'building blocks', 'kids toy', 'stuffed animal']
    },
    {
      code: '850440',
      rank: 9,
      tags: {},
      chapter: { num: '85', title: 'Electrical machinery and equipment' },
      heading: { num: '8504', title: 'Electrical transformers and static converters' },
      sub: { title: 'Static converters' },
      short: 'Static converters',
      plain: 'Power adapters and chargers that convert current, including many USB wall chargers. A rechargeable battery pack sold on its own is classified elsewhere.',
      verify: [
        'Converts current for a device',
        'A converter rather than a complete appliance',
        'Not a battery pack sold separately'
      ],
      detail: {
        build: 'Heading 8504 covers transformers, static converters and inductors. The subheading covers converters.',
        mixup: 'A charger built into a complete appliance is usually classified with that appliance.',
        note: 'Output wattage does not change the six-digit code.'
      },
      terms: ['charger', 'power adapter', 'usb charger', 'adapter', 'power supply', 'power brick']
    },
    {
      code: '847130',
      rank: 10,
      tags: {},
      chapter: { num: '84', title: 'Machinery and mechanical appliances' },
      heading: { num: '8471', title: 'Automatic data processing machines' },
      sub: { title: 'Portable machines, weighing not more than 10 kg' },
      short: 'Portable automatic data processing machines weighing not more than 10 kg',
      plain: 'Laptops and similar portable computers under 10 kg. A tablet without a keyboard usually follows a different path inside the same heading.',
      verify: [
        'Portable, with a keyboard and a screen',
        'Weighs 10 kg or less',
        'A complete machine, not a spare part'
      ],
      detail: {
        build: 'Heading 8471 covers automatic data processing machines. The subheading picks out the portable units under 10 kg.',
        mixup: 'A monitor or a keyboard sold on its own is a separate unit, not a complete portable machine.',
        note: 'Processor and memory specifications do not change the six-digit code.'
      },
      terms: ['laptop', 'notebook computer', 'portable computer', 'macbook']
    },
    {
      code: '090121',
      rank: 11,
      tags: {},
      chapter: { num: '09', title: 'Coffee, tea, maté and spices' },
      heading: { num: '0901', title: 'Coffee, roasted or unroasted, decaffeinated or not' },
      sub: { title: 'Roasted coffee, not decaffeinated' },
      short: 'Coffee, roasted, not decaffeinated',
      plain: 'Roasted regular coffee, whole bean or ground. Decaffeinated roasted coffee is 090122, which is why the decaffeination status is part of the question.',
      verify: [
        'Roasted, not green coffee',
        'Not decaffeinated',
        'Coffee, not a coffee substitute'
      ],
      detail: {
        build: 'Heading 0901 covers coffee at every stage. The subheading separates green from roasted and regular from decaffeinated.',
        mixup: 'Green coffee is 090111, and decaffeinated roasted coffee is 090122.',
        note: 'Packaging size does not change the subheading.'
      },
      terms: ['coffee', 'roasted coffee', 'coffee beans', 'ground coffee', 'espresso beans']
    }
  ];

  /* Chapter 01 — real HTSUS 2026 Rev.23 / EU CN 2022 sample */
  var CH1_US = [{"hts8":"01012100","description":"Purebred breeding animals","unit":"","general":"Free","special":"","col2":"Free","suffixes":[{"stat":"10","description":"Males","unit":"No","context":"Horses:"},{"stat":"20","description":"Females","unit":"No","context":""}]},{"hts8":"01012900","description":"Other","unit":"","general":"Free","special":"","col2":"20%","suffixes":[{"stat":"10","description":"Imported for immediate slaughter","unit":"No","context":""},{"stat":"90","description":"Other","unit":"No","context":""}]},{"hts8":"01013000","description":"Asses","unit":"No","general":"6.8%","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG)","col2":"15%","suffixes":[{"stat":"00","description":"Asses","unit":"No","context":""}]},{"hts8":"01019030","description":"Imported for immediate slaughter","unit":"No","general":"Free","special":"","col2":"Free","suffixes":[{"stat":"00","description":"Imported for immediate slaughter","unit":"No","context":""}]},{"hts8":"01019040","description":"Other","unit":"No","general":"4.5%","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG)","col2":"20%","suffixes":[{"stat":"00","description":"Other","unit":"No","context":""}]},{"hts8":"01022100","description":"Purebred breeding animals","unit":"","general":"Free","special":"RRaatteess ooff DDuuttyy","col2":"Free","suffixes":[{"stat":"10","description":"Male","unit":"No","context":"Cattle: / Dairy:"},{"stat":"20","description":"Female","unit":"No","context":""},{"stat":"30","description":"Male","unit":"No","context":"Other:"},{"stat":"50","description":"Female","unit":"No","context":""}]},{"hts8":"01022920","description":"Cows imported specially for dairy purposes","unit":"","general":"Free","special":"","col2":"6.6¢/kg","suffixes":[{"stat":"11","description":"Weighing less than 90 kg each","unit":"No","context":""},{"stat":"12","description":"Weighing 90 kg or more each","unit":"","context":""}]},{"hts8":"01022940","description":"Other","unit":"","general":"1¢/kg","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG) RRaatteess ooff DDuuttyy","col2":"5.5¢/kg","suffixes":[{"stat":"24","description":"Male","unit":"No","context":"Weighing less than 90 kg each:"},{"stat":"28","description":"Female","unit":"No","context":""},{"stat":"34","description":"Male","unit":"No","context":"Weighing 90 kg or more but less than 200 kg / each:"},{"stat":"38","description":"Female","unit":"","context":""},{"stat":"54","description":"Male","unit":"","context":"Weighing 200 kg or more but less than 320 kg / each:"},{"stat":"58","description":"Female","unit":"No","context":""},{"stat":"62","description":"Steers","unit":"No","context":"Weighing 320 kg or more each: / For immediate slaughter:"},{"stat":"64","description":"Bulls","unit":"No","context":""},{"stat":"66","description":"Cows","unit":"No","context":""},{"stat":"68","description":"Heifers","unit":"No","context":""},{"stat":"72","description":"Male","unit":"No","context":"For breeding:"},{"stat":"74","description":"Female","unit":"No","context":""},{"stat":"82","description":"Male","unit":"No","context":"Other:"},{"stat":"84","description":"Female","unit":"No","context":""}]},{"hts8":"01023100","description":"Purebred breeding animals","unit":"","general":"Free","special":"","col2":"Free","suffixes":[{"stat":"10","description":"Male","unit":"No","context":"Buffalo:"},{"stat":"20","description":"Female","unit":"No","context":""}]},{"hts8":"01023900","description":"Other","unit":"","general":"1¢/kg","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG)","col2":"5.5¢/kg","suffixes":[{"stat":"10","description":"Bison","unit":"","context":""},{"stat":"24","description":"Male","unit":"","context":"Other: / Weighing less than 90 kg each:"},{"stat":"28","description":"Female","unit":"No","context":""},{"stat":"34","description":"Male","unit":"No","context":"Weighing 90 kg or more but less than 200 kg / each:"},{"stat":"38","description":"Female","unit":"No","context":""},{"stat":"54","description":"Male","unit":"No","context":"Weighing 200 kg or more but less than 320 kg / each:"},{"stat":"58","description":"Female","unit":"No","context":""},{"stat":"61","description":"For immediate slaughter","unit":"No","context":"Weighing 320 kg or more each:"},{"stat":"72","description":"Male","unit":"No","context":"For breeding:"},{"stat":"74","description":"Female","unit":"","context":""},{"stat":"82","description":"Male","unit":"No","context":"Other:"},{"stat":"84","description":"Female","unit":"No","context":""}]},{"hts8":"01029000","description":"Other","unit":"","general":"1¢/kg","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG) RRaatteess ooff DDuuttyy","col2":"5.5¢/kg","suffixes":[{"stat":"00","description":"Other","unit":"","context":""}]},{"hts8":"01031000","description":"Purebred breeding animals","unit":"No","general":"Free","special":"","col2":"Free","suffixes":[{"stat":"00","description":"Purebred breeding animals","unit":"No","context":""}]},{"hts8":"01039100","description":"Weighing less than 50 kg each","unit":"","general":"Free","special":"","col2":"4.4¢/kg","suffixes":[{"stat":"10","description":"Weighing less than 7 kg each","unit":"No","context":"Other:"},{"stat":"20","description":"Weighing 7 kg or more but less than 23 kg each","unit":"No","context":""},{"stat":"30","description":"Weighing 23 kg or more but less than 50 kg","unit":"","context":""}]},{"hts8":"01039200","description":"Weighing 50 kg or more each","unit":"","general":"Free","special":"","col2":"4.4¢/kg","suffixes":[{"stat":"10","description":"Imported for immediate slaughter","unit":"","context":"each"},{"stat":"20","description":"Breeding animals other than purebred breeding","unit":"","context":""},{"stat":"91","description":"Other","unit":"No","context":"animals"}]},{"hts8":"01041000","description":"Sheep","unit":"No","general":"Free","special":"","col2":"$3/head","suffixes":[{"stat":"00","description":"Sheep","unit":"No","context":""}]},{"hts8":"01042000","description":"Goats","unit":"No","general":"68¢/head","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG) RRaatteess ooff DDuuttyy","col2":"$3/head","suffixes":[{"stat":"00","description":"Goats","unit":"No","context":""}]},{"hts8":"01051100","description":"Chickens","unit":"","general":"0.9¢each","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG)","col2":"4¢each","suffixes":[{"stat":"10","description":"Layer-type (egg-type)","unit":"No","context":"urkeys and guineas: / Weighing not more than 185 g: / Breeding stock, whether or not purebred:"},{"stat":"20","description":"Broiler-type (meat-type)","unit":"No","context":""},{"stat":"40","description":"Other","unit":"","context":""}]},{"hts8":"01051200","description":"Turkeys","unit":"No","general":"0.9¢each","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG)","col2":"4¢each","suffixes":[{"stat":"00","description":"Turkeys","unit":"No","context":""}]},{"hts8":"01051300","description":"Ducks","unit":"No","general":"0.9¢each","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG)","col2":"4¢each","suffixes":[{"stat":"00","description":"Ducks","unit":"No","context":""}]},{"hts8":"01051400","description":"Geese","unit":"No","general":"0.9¢each","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG)","col2":"4¢each","suffixes":[{"stat":"00","description":"Geese","unit":"No","context":""}]},{"hts8":"01051500","description":"Guinea fowls","unit":"No","general":"0.9¢each","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG)","col2":"4¢each","suffixes":[{"stat":"00","description":"Guinea fowls","unit":"No","context":""}]},{"hts8":"01059400","description":"Chickens","unit":"No","general":"2¢/kg","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG)","col2":"17.6¢/kg","suffixes":[{"stat":"00","description":"Chickens","unit":"No","context":""}]},{"hts8":"01059900","description":"Other","unit":"No","general":"2¢/kg","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG) RRaatteess ooff DDuuttyy","col2":"17.6¢/kg","suffixes":[{"stat":"00","description":"Other","unit":"No","context":""}]},{"hts8":"01061100","description":"Primates","unit":"No","general":"Free","special":"","col2":"15%","suffixes":[{"stat":"00","description":"Primates","unit":"No","context":""}]},{"hts8":"01061201","description":"Whales,dolphinsandporpoises(mammalsoftheorder Cetacea); manatees and dugongs (mammals of the orderSirenia);seals,sealionsandwalruses(mammals","unit":"","general":"Free","special":"","col2":"15%","suffixes":[{"stat":"00","description":"Whales,dolphinsandporpoises(mammalsoftheorder Cetacea); manatees and dugongs (mammals of the orderSirenia);seals,sealionsandwalruses(mammals","unit":"","context":""}]},{"hts8":"01061300","description":"Camels and other camelids (Camelidae)","unit":"No","general":"Free","special":"","col2":"15%","suffixes":[{"stat":"00","description":"Camels and other camelids (Camelidae)","unit":"No","context":""}]},{"hts8":"01061400","description":"Rabbits and hares","unit":"No","general":"Free","special":"","col2":"15%","suffixes":[{"stat":"00","description":"Rabbits and hares","unit":"No","context":""}]},{"hts8":"01061930","description":"Foxes","unit":"No","general":"4.8%","special":"Free(A+,AU,BH, CL,CO,D,E,IL, JO,KR,MA,OM, P,PA,PE,S,SG)","col2":"15%","suffixes":[{"stat":"00","description":"Foxes","unit":"No","context":""}]},{"hts8":"01061991","description":"Other","unit":"","general":"Free","special":"","col2":"15%","suffixes":[{"stat":"20","description":"Dogs","unit":"No","context":""},{"stat":"95","description":"Other","unit":"","context":""}]},{"hts8":"01062000","description":"Reptiles (including snakes and turtles)","unit":"No","general":"Free","special":"","col2":"15%","suffixes":[{"stat":"00","description":"Reptiles (including snakes and turtles)","unit":"No","context":""}]},{"hts8":"01063100","description":"Birds of prey","unit":"","general":"1.8%","special":"Free(A,AU,BH,CL, CO,D,E,IL,JO, KR,MA,OM,P, PA,PE,S,SG)","col2":"20%","suffixes":[{"stat":"00","description":"Birds of prey","unit":"","context":""}]},{"hts8":"01063200","description":"Psittaciformes (including parrots, parakeets, macaws","unit":"","general":"1.8%","special":"Free(A,AU,BH,CL, CO,D,E,IL,JO, KR,MA,OM,P, PA,PE,S,SG)","col2":"20%","suffixes":[{"stat":"00","description":"Psittaciformes (including parrots, parakeets, macaws","unit":"","context":""}]},{"hts8":"01063300","description":"Ostriches; emus (Dromaius novaehollandiae)","unit":"No","general":"1.8%","special":"Free(A,AU,BH,CL, CO,D,E,IL,JO, KR,MA,OM,P, PA,PE,S,SG)","col2":"20%","suffixes":[{"stat":"00","description":"Ostriches; emus (Dromaius novaehollandiae)","unit":"No","context":""}]},{"hts8":"01063901","description":"Other","unit":"No","general":"1.8%","special":"Free(A,AU,BH,CL, CO,D,E,IL,JO, KR,MA,OM,P, PA,PE,S,SG)","col2":"20%","suffixes":[{"stat":"00","description":"Other","unit":"No","context":""}]},{"hts8":"01064100","description":"Bees","unit":"kg Free","general":"","special":"","col2":"15%","suffixes":[{"stat":"00","description":"Bees","unit":"kg Free","context":""}]},{"hts8":"01064900","description":"Other","unit":"","general":"Free","special":"","col2":"15%","suffixes":[{"stat":"10","description":"Leaf cutter bee larvae","unit":"kg","context":"Birds: / Insects:"},{"stat":"90","description":"Other","unit":"kg","context":""}]},{"hts8":"01069001","description":"Other","unit":"","general":"Free","special":"","col2":"15%","suffixes":[{"stat":"10","description":"Worms","unit":"kg","context":""},{"stat":"20","description":"Bait (other than worms)","unit":"kg","context":""},{"stat":"80","description":"Other","unit":"kg","context":""}]}];
    var CH1_EU = [{"code6":"010121","heading":"0101","desc":"Pure-bred breeding animals","level":2},{"code6":"010129","heading":"0101","desc":"Other","level":2},{"code6":"010130","heading":"0101","desc":"Asses","level":1},{"code6":"010190","heading":"0101","desc":"Other","level":1},{"code6":"010221","heading":"0102","desc":"Pure-bred breeding animals","level":2},{"code6":"010229","heading":"0102","desc":"Other","level":2},{"code6":"010231","heading":"0102","desc":"Pure-bred breeding animals","level":2},{"code6":"010239","heading":"0102","desc":"Other","level":2},{"code6":"010290","heading":"0102","desc":"Other","level":1},{"code6":"010310","heading":"0103","desc":"Pure-bred breeding animals","level":1},{"code6":"010391","heading":"0103","desc":"Weighing less than 50 kg","level":2},{"code6":"010392","heading":"0103","desc":"Weighing 50 kg or more","level":2},{"code6":"010410","heading":"0104","desc":"Sheep","level":1},{"code6":"010420","heading":"0104","desc":"Goats","level":1},{"code6":"010511","heading":"0105","desc":"Fowls of the species Gallus domesticus","level":2},{"code6":"010512","heading":"0105","desc":"Turkeys","level":2},{"code6":"010513","heading":"0105","desc":"Ducks","level":2},{"code6":"010514","heading":"0105","desc":"Geese","level":2},{"code6":"010515","heading":"0105","desc":"Guinea fowls","level":2},{"code6":"010594","heading":"0105","desc":"Fowls of the species Gallus domesticus","level":2},{"code6":"010599","heading":"0105","desc":"Other","level":2},{"code6":"010611","heading":"0106","desc":"Primates","level":2},{"code6":"010612","heading":"0106","desc":"Whales, dolphins and porpoises (mammals of the order","level":2},{"code6":"010613","heading":"0106","desc":"Camels and other camelids (Camelidae)","level":2},{"code6":"010614","heading":"0106","desc":"Rabbits and hares","level":2},{"code6":"010619","heading":"0106","desc":"Other","level":2},{"code6":"010620","heading":"0106","desc":"Reptiles (including snakes and turtles)","level":1},{"code6":"010631","heading":"0106","desc":"Birds of prey","level":2},{"code6":"010632","heading":"0106","desc":"Psittaciformes (including parrots, parakeets, macaws and","level":2},{"code6":"010633","heading":"0106","desc":"Ostriches; emus (Dromaius novaehollandiae)","level":2},{"code6":"010639","heading":"0106","desc":"Other","level":2},{"code6":"010641","heading":"0106","desc":"Bees","level":2},{"code6":"010649","heading":"0106","desc":"Other","level":2},{"code6":"010690","heading":"0106","desc":"Other","level":1}];


  var HTS_PAGE_URL = 'https://4m9b4axtfejc8.doubao.link/app/app_17j75a6s6p5';

  var CH1_TITLES = {
    '0101': 'Live horses, asses, mules and hinnies',
    '0102': 'Live bovine animals',
    '0103': 'Live swine',
    '0104': 'Live sheep and goats',
    '0105': 'Live poultry: chickens, ducks, geese, turkeys and guinea fowls',
    '0106': 'Other live animals'
  };

  var HS = {};
  HS_ENTRIES.forEach(function (entry) { HS[entry.code] = entry; });
  /* Fill six-digit entries for chapter 01 from the real HTSUS file where the demo has none */
  (function () {
    var seen = {};
    CH1_US.forEach(function (record) {
      var code = record.hts8.slice(0, 6);
      if (seen[code]) return;
      seen[code] = true;
      if (HS[code]) return;
      var eu = CH1_EU.filter(function (row) { return row.code6 === code; })[0];
      var title = eu ? eu.desc : record.description;
      HS[code] = {
        code: code,
        rank: 0,
        tags: {},
        chapter: { num: '01', title: 'Live animals' },
        heading: { num: code.slice(0, 4), title: CH1_TITLES[code.slice(0, 4)] || '' },
        sub: { title: title },
        short: title,
        plain: '',
        verify: [],
        detail: { build: '', mixup: '', note: '' },
        terms: [title.toLowerCase()]
      };
    });
  })();

  /* Local rows are placeholders, deliberately written with X characters. */
  var US_HTS = {
    '010129': [
      { code: '010129XX01', desc: 'Live horses, other than pure-bred breeding animals', detail: 'Placeholder row for horses shipped for racing, riding or work. Real schedules also split by value and intended use.', checks: ['Live animal', 'Not breeding stock', 'Use declared'] }
    ],
    '010221': [
      { code: '010221XX01', desc: 'Pure-bred breeding cattle', detail: 'Placeholder row for breeding cattle. Pedigree records support this line.', checks: ['Live animal', 'Pedigree attached', 'Breeding use declared'] }
    ],
    '020130': [
      { code: '020130XX01', desc: 'Fresh or chilled boneless bovine meat', detail: 'Placeholder row for chilled boneless beef. Frozen product and bone-in cuts sit on other rows.', checks: ['Chilled, not frozen', 'Boneless', 'Cold chain documented'] }
    ],
    '040210': [
      { code: '040210XX01', desc: 'Milk powder, fat content 1.5% or less', detail: 'Placeholder row for skimmed milk powder. Fat content drives the split inside the heading.', checks: ['Fat content stated', 'Powder form', 'Dairy establishment approved'] }
    ],
    '040900': [
      { code: '040900XX01', desc: 'Natural honey', detail: 'Placeholder row for natural honey. Origin and botanical source are usually declared.', checks: ['No added sugar', 'Origin stated', 'Packaging declared'] }
    ],
    '050510': [
      { code: '050510XX01', desc: 'Feathers and down for stuffing', detail: 'Placeholder row for cleaned stuffing down. Processing and sterilisation are recorded locally.', checks: ['Cleaned and treated', 'Stuffing use', 'Animal by-product rules met'] }
    ],
    '150910': [
      { code: '150910XX01', desc: 'Virgin olive oil, in containers under 18 kg', detail: 'Local rows split virgin olive oil by pack size. Retail sizes sit here; bulk drums go to the next line.', checks: ['Virgin grade stated', 'Container size declared', 'Acidity on the certificate'] },
      { code: '150910XX02', desc: 'Virgin olive oil, in containers of 18 kg or more', detail: 'The bulk line of the same subheading. Only the pack size differs from the row above.', checks: ['Virgin grade stated', 'Container size 18 kg or more', 'Acidity on the certificate'] }
    ],
    '160100': [
      { code: '160100XX01', desc: 'Sausages and similar products, of pork', detail: 'Placeholder local row for pork sausages. Real schedules also split by species and by container size.', checks: ['Meat species stated', 'Net weight declared', 'Prepared, not raw'] }
    ],
    '250100': [
      { code: '250100XX01', desc: 'Salt for food use, iodised', detail: 'Food-grade salt with iodine. Industrial and de-icing salt sit on a separate local line in real schedules.', checks: ['Food grade', 'Iodised or not stated', 'Purity declared'] }
    ],
    '280700': [
      { code: '280700XX01', desc: 'Sulfuric acid, technical grade', detail: 'Placeholder row for technical acid. Concentration drives the real local split.', checks: ['Concentration stated', 'UN number on the transport document', 'Dangerous goods packing'] }
    ],
    '420221': [
      { code: '420221XX01', desc: 'Handbags with outer surface of leather', detail: 'Local rows separate leather handbags from textile and plastic outers, which sit in other subheadings.', checks: ['Outer surface is leather', 'Handbag or shoulder bag', 'Lining material stated'] }
    ],
    '440711': [
      { code: '440711XX01', desc: 'Pine wood sawn or chipped, over 6 mm thick', detail: 'Placeholder row for pine lumber. Real schedules split by thickness range and by species.', checks: ['Species is pine', 'Thickness declared', 'Phytosanitary certificate attached'] }
    ],
    '481910': [
      { code: '481910XX01', desc: 'Corrugated cartons and boxes', detail: 'Placeholder row for corrugated shipping cartons. Folding cartons of solid board sit in the next subheading.', checks: ['Corrugated board', 'Carton or box', 'Dimensions declared'] }
    ],
    '710812': [
      { code: '710812XX01', desc: 'Gold, unwrought, non-monetary', detail: 'Placeholder row for bullion. Fineness and form drive the real local split.', checks: ['Fineness stated', 'Non-monetary form', 'Licence where required'] }
    ],
    '720839': [
      { code: '720839XX01', desc: 'Hot-rolled steel coil, under 3 mm', detail: 'Placeholder row for hot-rolled coil. Coated and pickled coil sit in later headings.', checks: ['Hot-rolled and coiled', 'Under 3 mm', 'Mill certificate attached'] }
    ],
    '860900': [
      { code: '860900XX01', desc: 'Freight containers, including refrigerated', detail: 'Placeholder row for transport containers. Real schedules split by size and by refrigerated or dry.', checks: ['Multimodal container', 'Size and type stated', 'CSC plate valid'] }
    ],
    '901831': [
      { code: '901831XX01', desc: 'Syringes, with or without needles', detail: 'Placeholder row for medical syringes. Sterile and non-sterile packing can be separated locally.', checks: ['Sterility stated', 'Single use or reusable', 'Device registration where required'] }
    ],
    '930400': [
      { code: '930400XX01', desc: 'Air rifles, air pistols and similar arms', detail: 'Placeholder row for non-firearm arms. Energy limits and licensing differ by market.', checks: ['Operates by air or gas', 'Muzzle energy stated', 'Licence where required'] }
    ],
    '970300': [
      { code: '970300XX01', desc: 'Original sculptures and statuary', detail: 'Placeholder row for original sculpture. Documentation of authorship drives the real local treatment.', checks: ['Original work', 'Artist documented', 'Not a reproduction'] }
    ],
    '010121': [
      { code: '010121XX01', desc: 'Pure-bred breeding horses, registered with a breed association', detail: 'Local rows separate registered breeding stock from other pure-bred horses. The registration papers decide which row applies.', checks: ['Live animal', 'Stud book or breed association papers attached', 'Breeding use declared'] },
      { code: '010121XX02', desc: 'Pure-bred breeding horses, other than registered stock', detail: 'A second local line for pure-bred horses whose papers are incomplete or from a registry the destination does not list.', checks: ['Live animal', 'Breeding use declared', 'Papers reviewed before entry'] }
    ],
    '610910': [
      { code: '610910XX01', desc: 'Men\u2019s or boys\u2019 cotton knit T-shirts, singlets and vests', detail: 'Local schedules split the six-digit line by the wearer and by garment type. This row is the men\u2019s and boys\u2019 line for knit cotton T-shirts.', checks: ['Wearer is male, or unisex sizing is declared for men', 'Knitted or crocheted construction', 'Cotton content stated by weight'] },
      { code: '610910XX02', desc: 'Women\u2019s or girls\u2019 cotton knit T-shirts, singlets and vests', detail: 'The women\u2019s and girls\u2019 line of the same six-digit subheading. The difference from the row above is the wearer, not the fabric.', checks: ['Wearer is female, or the cut is a women\u2019s style', 'Knitted or crocheted construction', 'Cotton content stated by weight'] },
      { code: '610910XX03', desc: 'Other cotton knit tops, including tank tops and unisex styles', detail: 'A residual row for cotton knit tops that do not fit the two wearer lines above. Start here when the style is unisex or the wearer is not specified.', checks: ['Style is a vest, tank top or unisex T-shirt', 'No other row describes the garment more precisely', 'Cotton content stated by weight'] }
    ],
    '620520': [
      { code: '620520XX01', desc: 'Men\u2019s or boys\u2019 woven cotton shirts, long or short sleeves', detail: 'Woven cotton shirts for men and boys sit under this local line. Sleeve length is collected here rather than at six digits.', checks: ['Woven fabric', 'Cut for men or boys', 'Front opening with buttons or a similar closure'] },
      { code: '620520XX02', desc: 'Men\u2019s or boys\u2019 woven cotton work shirts and overshirts', detail: 'A separate local row for heavier work shirts and overshirts. The distinction is the intended use of the garment.', checks: ['Woven cotton', 'Intended as workwear or an overshirt', 'Not a uniform issued by an authority'] }
    ],
    '620630': [
      { code: '620630XX01', desc: 'Women\u2019s or girls\u2019 woven cotton blouses and shirts', detail: 'The women\u2019s and girls\u2019 line for woven cotton tops with a front opening.', checks: ['Woven fabric', 'Cut for women or girls', 'Blouse or shirt construction'] },
      { code: '620630XX02', desc: 'Women\u2019s or girls\u2019 woven cotton shirt-blouses and tunics', detail: 'Covers shirt-blouses and tunic-length styles that fall in the same subheading but are described differently locally.', checks: ['Woven cotton', 'Shirt-blouse or tunic length', 'Cut for women or girls'] }
    ],
    '691110': [
      { code: '691110XX01', desc: 'Porcelain or china mugs and cups', detail: 'Local rows separate mugs and cups from plates and bowls, even though both sit in the same six-digit subheading.', checks: ['Body is porcelain or china', 'A drinking vessel, not a serving dish', 'Capacity and finish as declared'] },
      { code: '691110XX02', desc: 'Porcelain or china plates, bowls and serving dishes', detail: 'The tableware side of the same subheading. Shape decides which local row applies.', checks: ['Body is porcelain or china', 'Used for serving or eating', 'Not a decorative display piece'] }
    ],
    '691200': [
      { code: '691200XX01', desc: 'Stoneware and earthenware mugs and cups', detail: 'Non-porcelain ceramic drinking vessels. The body material separates this row from the porcelain line.', checks: ['Ceramic body that is not porcelain or china', 'A drinking vessel', 'Glaze described if relevant'] },
      { code: '691200XX02', desc: 'Other ceramic tableware and kitchenware', detail: 'A residual row for ceramic plates, bowls and kitchen items that are not porcelain.', checks: ['Ceramic body that is not porcelain', 'Table or kitchen use', 'Not a purely ornamental article'] }
    ],
    '640399': [
      { code: '640399XX01', desc: 'Leather-upper footwear, men\u2019s sizes', detail: 'Local rows often separate footwear by the wearer, then by upper and sole material.', checks: ['Upper is leather', 'Outer sole material stated', 'Men\u2019s sizing'] },
      { code: '640399XX02', desc: 'Leather-upper footwear, women\u2019s sizes', detail: 'The women\u2019s line of the same six-digit subheading.', checks: ['Upper is leather', 'Outer sole material stated', 'Women\u2019s sizing'] }
    ]
  };

  /* Extra destinations are placeholders with deliberately thin demo coverage. */
  var EU_TARIFF = {
    '010121': [
      { code: '010121XX01', desc: 'Pure-bred breeding horses (EU placeholder line)', detail: 'Placeholder for the TARIC line under 010121. Real EU rows can run beyond ten digits, so treat this as illustrative only.', checks: ['Live animal', 'Breeding papers attached', 'Entry point and health certificate stated'] }
    ],
    '610910': [
      { code: '610910XX01', desc: 'Knitted cotton T-shirts, men\u2019s or boys\u2019 (EU placeholder line)', detail: 'Placeholder for the EU TARIC line under 610910. The real schedule splits this subheading by the wearer, as the US rows do.', checks: ['Wearer stated on the commercial invoice', 'Knitted or crocheted construction', 'Cotton content by weight'] },
      { code: '610910XX02', desc: 'Knitted cotton T-shirts, women\u2019s or girls\u2019 (EU placeholder line)', detail: 'The women\u2019s and girls\u2019 placeholder line of the same subheading. Only the wearer differs from the row above.', checks: ['Wearer stated on the commercial invoice', 'Knitted or crocheted construction', 'Cotton content by weight'] }
    ],
    '691110': [
      { code: '691110XX01', desc: 'Porcelain or china tableware (EU placeholder line)', detail: 'Placeholder for the EU TARIC line under 691110. Real EU rows are longer than ten digits in some cases, so treat this as illustrative only.', checks: ['Body is porcelain or china', 'Table or kitchen use', 'Not a decorative article'] }
    ]
  };

  var CN_TARIFF = {
    '010121': [
      { code: '010121XX01', desc: 'Pure-bred breeding horses (China placeholder line)', detail: 'Placeholder for the China tariff line under 010121. The real schedule adds two digits to the eight-digit national code.', checks: ['Live animal', 'Quarantine permit arranged', 'Breeding use declared'] }
    ],
    '610910': [
      { code: '610910XX01', desc: 'Cotton knit T-shirts, men\u2019s or boys\u2019 (China placeholder line)', detail: 'Placeholder for a China tariff line under 610910, included so three markets can be compared in the chapter flow.', checks: ['Knitted construction', 'Cotton content by weight', 'Wearer stated on the invoice'] },
      { code: '610910XX02', desc: 'Cotton knit T-shirts, women\u2019s or girls\u2019 (China placeholder line)', detail: 'The women\u2019s and girls\u2019 placeholder line of the same six-digit subheading.', checks: ['Knitted construction', 'Cotton content by weight', 'Wearer stated on the invoice'] }
    ],
    '691110': [
      { code: '691110XX01', desc: 'Porcelain or china tableware (China placeholder line)', detail: 'Placeholder for a China tariff line under 691110, kept deliberately simple for the demo.', checks: ['Body is porcelain or china', 'Table or kitchen use', 'Not a decorative article'] }
    ]
  };

  var COUNTRIES = [
    { id: 'US', name: 'United States', system: 'HTSUS', digits: 10, rows: US_HTS },
    { id: 'EU', name: 'European Union', system: 'TARIC', digits: 10, rows: EU_TARIFF },
    { id: 'CN', name: 'China', system: 'China Tariff', digits: 10, rows: CN_TARIFF }
  ];

  function countryById(id) {
    for (var i = 0; i < COUNTRIES.length; i++) {
      if (COUNTRIES[i].id === id) return COUNTRIES[i];
    }
    return COUNTRIES[0];
  }

  var CHAPTERS = [
    { range: '01\u201305', from: 1, to: 5, label: 'Live animals and animal products' },
    { range: '06\u201314', from: 6, to: 14, label: 'Vegetable products' },
    { range: '15', from: 15, to: 15, label: 'Fats and oils' },
    { range: '16\u201324', from: 16, to: 24, label: 'Prepared food and beverages' },
    { range: '25\u201327', from: 25, to: 27, label: 'Mineral products' },
    { range: '28\u201338', from: 28, to: 38, label: 'Chemicals' },
    { range: '39\u201340', from: 39, to: 40, label: 'Plastics and rubber' },
    { range: '41\u201343', from: 41, to: 43, label: 'Leather and hides' },
    { range: '44\u201346', from: 44, to: 46, label: 'Wood and cork' },
    { range: '47\u201349', from: 47, to: 49, label: 'Pulp and paper' },
    { range: '50\u201363', from: 50, to: 63, label: 'Textiles and apparel' },
    { range: '64\u201367', from: 64, to: 67, label: 'Footwear and headwear' },
    { range: '68\u201370', from: 68, to: 70, label: 'Stone, ceramics and glass' },
    { range: '71', from: 71, to: 71, label: 'Precious metals and jewellery' },
    { range: '72\u201383', from: 72, to: 83, label: 'Base metals' },
    { range: '84\u201385', from: 84, to: 85, label: 'Machinery and electronics' },
    { range: '86\u201389', from: 86, to: 89, label: 'Vehicles and transport' },
    { range: '90\u201392', from: 90, to: 92, label: 'Instruments and clocks' },
    { range: '93', from: 93, to: 93, label: 'Arms and ammunition' },
    { range: '94\u201396', from: 94, to: 96, label: 'Furniture and other goods' },
    { range: '97', from: 97, to: 97, label: 'Works of art' },
    { range: '99', from: 99, to: 99, label: 'Special provisions' }
  ];


window.HSDATA = { HS_ENTRIES: HS_ENTRIES, CH1_US: CH1_US, CH1_EU: CH1_EU, US_HTS: US_HTS, EU_TARIFF: EU_TARIFF, CN_TARIFF: CN_TARIFF, CHAPTERS: CHAPTERS, CH1_TITLES: CH1_TITLES };
