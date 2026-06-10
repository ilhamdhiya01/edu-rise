export interface Course {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  subCategorySlug: string;
  imageUrl: string;
  instructor: string;
  rating: number;
  studentsCount: number;
  lessonsCount: number;
}

const generateCourses = () => {
  const courses: Course[] = [];
  let id = 1;

  const templates: Record<
    string,
    Array<{
      title: string;
      desc: string;
      instructor: string;
      rating: number;
      students: number;
      lessons: number;
      img: string;
    }>
  > = {
    // Category 1: Pemrograman
    'sub-1-1': [
      {
        title: 'Membuat Website Modern dengan React',
        desc: 'Pengenalan React dan Setup Environment',
        instructor: 'Budi Santoso',
        rating: 4.8,
        students: 1240,
        lessons: 45,
        img: '1633356122544-f134324a6cee',
      },
      {
        title: 'Frontend Developer dengan Next.js',
        desc: 'Routing dan Server Side Rendering',
        instructor: 'Siti Nurhaliza',
        rating: 4.9,
        students: 980,
        lessons: 38,
        img: '1627398242454-45a1465c2479',
      },
      {
        title: 'Full Stack JavaScript Developer',
        desc: 'Integrasi Backend dengan Node.js',
        instructor: 'Ahmad Hidayat',
        rating: 4.7,
        students: 1560,
        lessons: 52,
        img: '1498050108023-c5249f4df085',
      },
    ],
    'sub-1-2': [
      {
        title: 'Membuat Aplikasi Android dengan Kotlin',
        desc: 'Dasar Kotlin dan Android Studio',
        instructor: 'Rudi Hermawan',
        rating: 4.7,
        students: 1120,
        lessons: 42,
        img: '1607252650355-f7fd0460ccdb',
      },
      {
        title: 'Flutter - Build iOS dan Android',
        desc: 'Cross Platform Mobile Development',
        instructor: 'Maya Sari',
        rating: 4.8,
        students: 1450,
        lessons: 48,
        img: '1512941937669-90a1b58e7e9c',
      },
      {
        title: 'React Native Fundamental',
        desc: 'JavaScript Mobile Development',
        instructor: 'Fajar Nugroho',
        rating: 4.6,
        students: 980,
        lessons: 40,
        img: '1551650975-87deedd944c3',
      },
    ],
    'sub-1-3': [
      {
        title: 'Python untuk Data Science',
        desc: 'Pandas dan NumPy Fundamental',
        instructor: 'Dr. Andi Wijaya',
        rating: 4.9,
        students: 2100,
        lessons: 50,
        img: '1551288049-bebda4e38f71',
      },
      {
        title: 'Machine Learning dengan Python',
        desc: 'Scikit-learn dan TensorFlow',
        instructor: 'Prof. Bambang',
        rating: 4.8,
        students: 1890,
        lessons: 55,
        img: '1527474305487-b87b222841cc',
      },
      {
        title: 'Data Visualization',
        desc: 'Membuat Grafik dan Dashboard',
        instructor: 'Dewi Lestari',
        rating: 4.7,
        students: 1450,
        lessons: 35,
        img: '1543286386-713bdd548da4',
      },
    ],

    // Category 2: Bisnis
    'sub-2-1': [
      {
        title: 'Memulai Bisnis dari Nol',
        desc: 'Ide dan Validasi Market',
        instructor: 'Bambang Susilo',
        rating: 4.7,
        students: 1890,
        lessons: 45,
        img: '1507679799987-c73779587ccf',
      },
      {
        title: 'Business Model Canvas',
        desc: 'Merancang Model Bisnis',
        instructor: 'Siti Aisyah',
        rating: 4.8,
        students: 1450,
        lessons: 38,
        img: '1454165804606-c3d57bc86b40',
      },
      {
        title: 'Funding Startup',
        desc: 'Mencari Modal Usaha',
        instructor: 'Andi Wijaya',
        rating: 4.9,
        students: 1230,
        lessons: 40,
        img: '1553729459-efe14ef6055d',
      },
    ],
    'sub-2-2': [
      {
        title: 'Agile Project Management',
        desc: 'Scrum dan Kanban',
        instructor: 'Agus Santoso',
        rating: 4.8,
        students: 1340,
        lessons: 40,
        img: '1557804506-669a67965ba0',
      },
      {
        title: 'Leadership Team Building',
        desc: 'Memimpin Tim Efektif',
        instructor: 'Nina Marlina',
        rating: 4.9,
        students: 1560,
        lessons: 38,
        img: '1521791136064-7986c2920216',
      },
      {
        title: 'Time Management',
        desc: 'Produktivitas Prioritas',
        instructor: 'Hadi Pratama',
        rating: 4.7,
        students: 1230,
        lessons: 32,
        img: '1542626991-cbc4e32524cc',
      },
    ],
    'sub-2-3': [
      {
        title: 'Business Strategy',
        desc: 'Analisis SWOT Porter',
        instructor: 'Dedi Kurniawan',
        rating: 4.8,
        students: 1450,
        lessons: 42,
        img: '1552664730-d307ca884978',
      },
      {
        title: 'Competitive Strategy',
        desc: 'Mengalahkan Kompetitor',
        instructor: 'Lina Wijaya',
        rating: 4.9,
        students: 1120,
        lessons: 40,
        img: '1454165804606-c3d57bc86b40',
      },
      {
        title: 'Strategic Planning',
        desc: 'Long-term Planning',
        instructor: 'Fajar Nugroho',
        rating: 4.7,
        students: 980,
        lessons: 38,
        img: '1559136555-9303baea8ebd',
      },
    ],

    // Category 3: Keuangan
    'sub-3-1': [
      {
        title: 'Dasar Akuntansi',
        desc: 'Persamaan Dasar',
        instructor: 'Sri Mulyani',
        rating: 4.7,
        students: 1670,
        lessons: 42,
        img: '1554224155-6726b3ff858f',
      },
      {
        title: 'Akuntansi Keuangan',
        desc: 'Laporan Keuangan',
        instructor: 'Bambang Hartono',
        rating: 4.8,
        students: 1340,
        lessons: 45,
        img: '1450101499163-c8848c66ca85',
      },
      {
        title: 'Akuntansi Manajemen',
        desc: 'Budgeting Cost Control',
        instructor: 'Dewi Anggraini',
        rating: 4.6,
        students: 1120,
        lessons: 38,
        img: '1460925895917-afdab827c52f',
      },
    ],
    'sub-3-2': [
      {
        title: 'Investasi Saham Pemula',
        desc: 'Dasar Pasar Modal',
        instructor: 'Lo Kheng Hong',
        rating: 4.9,
        students: 2340,
        lessons: 50,
        img: '1611974789855-9c2a0a7236a3',
      },
      {
        title: 'Reksa Dana ETF',
        desc: 'Diversifikasi Investasi',
        instructor: 'Ellen May',
        rating: 4.8,
        students: 1890,
        lessons: 42,
        img: '1579621970795-87facc2f976d',
      },
      {
        title: 'Properti Investment',
        desc: 'Real Estate',
        instructor: 'Ciputra',
        rating: 4.7,
        students: 1670,
        lessons: 45,
        img: '1560518883-ce09059eeffa',
      },
    ],
    'sub-3-3': [
      {
        title: 'Bitcoin Blockchain',
        desc: 'Pengenalan Cryptocurrency',
        instructor: 'Oscar Darmawan',
        rating: 4.8,
        students: 1780,
        lessons: 40,
        img: '1518546305927-5a555bb7020d',
      },
      {
        title: 'Trading Cryptocurrency',
        desc: 'Analisis Teknikal Crypto',
        instructor: 'Indra Kesuma',
        rating: 4.7,
        students: 1560,
        lessons: 45,
        img: '1621416894569-0f39ed31d247',
      },
      {
        title: 'DeFi Web3',
        desc: 'Decentralized Finance',
        instructor: 'William Sutanto',
        rating: 4.9,
        students: 890,
        lessons: 42,
        img: '1639762681485-074b7f938ba0',
      },
    ],

    // Category 4: Desain
    'sub-4-1': [
      {
        title: 'Figma UI/UX',
        desc: 'Modern Interfaces',
        instructor: 'Iqbal Pratama',
        rating: 4.9,
        students: 1670,
        lessons: 42,
        img: '1581291518857-1e45efbb1def',
      },
      {
        title: 'User Research',
        desc: 'Understanding Users',
        instructor: 'Sarah Khalida',
        rating: 4.8,
        students: 1450,
        lessons: 38,
        img: '1522542558440-99a31c3a83a3',
      },
      {
        title: 'Wireframing Prototyping',
        desc: 'Interactive Prototype',
        instructor: 'Denny Firdaus',
        rating: 4.7,
        students: 1230,
        lessons: 35,
        img: '1545665225-b23b99e4d45f',
      },
    ],
    'sub-4-2': [
      {
        title: 'Adobe Illustrator',
        desc: 'Vector Graphic Design',
        instructor: 'Dimas Prasetyo',
        rating: 4.8,
        students: 1560,
        lessons: 42,
        img: '1626785774625-ddcddc3f7315',
      },
      {
        title: 'Photoshop Designer',
        desc: 'Photo Editing',
        instructor: 'Linda Wijaya',
        rating: 4.7,
        students: 1890,
        lessons: 45,
        img: '1572044162444-ad60f128bdea',
      },
      {
        title: 'Logo Design',
        desc: 'Memorable Brands',
        instructor: 'Ari Nugraha',
        rating: 4.9,
        students: 1340,
        lessons: 38,
        img: '1626785774537-4959d2cb4217',
      },
    ],
    'sub-4-3': [
      {
        title: 'Blender 3D Modeling',
        desc: '3D Graphics Intro',
        instructor: 'Reza Fahlevi',
        rating: 4.8,
        students: 1450,
        lessons: 50,
        img: '1633356122544-f134324a6cee',
      },
      {
        title: 'Character Animation',
        desc: 'Rigging Character',
        instructor: 'Yoga Santoso',
        rating: 4.9,
        students: 1230,
        lessons: 48,
        img: '1593305841991-05c297ba4575',
      },
      {
        title: 'Motion Graphics',
        desc: 'Animated Videos',
        instructor: 'Dini Rahayu',
        rating: 4.7,
        students: 1560,
        lessons: 42,
        img: '1614729939124-3e2c35e1c98f',
      },
    ],

    // Category 5: Marketing
    'sub-5-1': [
      {
        title: 'Digital Marketing Strategy',
        desc: 'Marketing Plan',
        instructor: 'Andi Wijaya',
        rating: 4.8,
        students: 1890,
        lessons: 45,
        img: '1460925895917-afdab827c52f',
      },
      {
        title: 'Google Ads',
        desc: 'PPC Optimization',
        instructor: 'Bambang Susilo',
        rating: 4.9,
        students: 1670,
        lessons: 42,
        img: '1551288049-bebda4e38f71',
      },
      {
        title: 'Facebook Instagram Ads',
        desc: 'Social Advertising',
        instructor: 'Dewi Anggraini',
        rating: 4.7,
        students: 1560,
        lessons: 40,
        img: '1611162617767-6082f720fd3b',
      },
    ],
    'sub-5-2': [
      {
        title: 'Instagram Marketing',
        desc: 'Grow Account',
        instructor: 'Fajar Nugroho',
        rating: 4.8,
        students: 2100,
        lessons: 40,
        img: '1611162617767-6082f720fd3b',
      },
      {
        title: 'TikTok Content',
        desc: 'Viral Strategy',
        instructor: 'Maya Kartika',
        rating: 4.9,
        students: 1890,
        lessons: 38,
        img: '1611162617767-6082f720fd3b',
      },
      {
        title: 'LinkedIn B2B',
        desc: 'Professional Networking',
        instructor: 'Indra Gunawan',
        rating: 4.7,
        students: 1450,
        lessons: 35,
        img: '1611162617767-6082f720fd3b',
      },
    ],
    'sub-5-3': [
      {
        title: 'Content Marketing',
        desc: 'Valuable Content',
        instructor: 'Rizki Pratama',
        rating: 4.8,
        students: 1560,
        lessons: 42,
        img: '1552664730-d307ca884978',
      },
      {
        title: 'Blogging Bisnis',
        desc: 'SEO-Friendly Posts',
        instructor: 'Dimas Arya',
        rating: 4.7,
        students: 1340,
        lessons: 38,
        img: '1542831371-29b0f74f9713',
      },
      {
        title: 'Video Content',
        desc: 'YouTube TikTok',
        instructor: 'Fitri Handayani',
        rating: 4.9,
        students: 1450,
        lessons: 40,
        img: '1611162617767-6082f720fd3b',
      },
    ],

    // Category 6: Fotografi
    'sub-6-1': [
      {
        title: 'Portrait Photography',
        desc: 'Lighting Composition',
        instructor: 'Rizki Pratama',
        rating: 4.8,
        students: 1450,
        lessons: 42,
        img: '1531746790731-6c087fecd65a',
      },
      {
        title: 'Studio Portrait',
        desc: 'Professional Setup',
        instructor: 'Dimas Arya',
        rating: 4.9,
        students: 1230,
        lessons: 40,
        img: '1531746790731-6c087fecd65a',
      },
      {
        title: 'Environmental Portraits',
        desc: 'Location Photography',
        instructor: 'Fitri Handayani',
        rating: 4.7,
        students: 1120,
        lessons: 38,
        img: '1531746790731-6c087fecd65a',
      },
    ],
    'sub-6-2': [
      {
        title: 'Product Photography',
        desc: 'Still Life',
        instructor: 'Yoga Pratama',
        rating: 4.8,
        students: 1560,
        lessons: 40,
        img: '1523275335684-37898b6baf30',
      },
      {
        title: 'E-Commerce Photos',
        desc: 'White Background',
        instructor: 'Nina Amelia',
        rating: 4.7,
        students: 1670,
        lessons: 38,
        img: '1563013544-824ae1b704d3',
      },
      {
        title: 'Creative Product',
        desc: 'Lifestyle Context',
        instructor: 'Arif Rahman',
        rating: 4.9,
        students: 1230,
        lessons: 42,
        img: '1523275335684-37898b6baf30',
      },
    ],
    'sub-6-3': [
      {
        title: 'Landscape Photography',
        desc: 'Composition Timing',
        instructor: 'Hadi Wijaya',
        rating: 4.9,
        students: 1890,
        lessons: 45,
        img: '1506905925346-21bda4d32df4',
      },
      {
        title: 'Golden Hour',
        desc: 'Sunrise Sunset',
        instructor: 'Rina Susanti',
        rating: 4.8,
        students: 1560,
        lessons: 40,
        img: '1506905925346-21bda4d32df4',
      },
      {
        title: 'Long Exposure',
        desc: 'Water Cloud Motion',
        instructor: 'Dedy Kusuma',
        rating: 4.7,
        students: 1340,
        lessons: 38,
        img: '1506905925346-21bda4d32df4',
      },
    ],
  };

  const catMap: Record<
    string,
    { catId: string; catName: string; subName: string }
  > = {
    'sub-1-1': {
      catId: 'cat-1',
      catName: 'Pemrograman',
      subName: 'Web Development',
    },
    'sub-1-2': {
      catId: 'cat-1',
      catName: 'Pemrograman',
      subName: 'Mobile Development',
    },
    'sub-1-3': {
      catId: 'cat-1',
      catName: 'Pemrograman',
      subName: 'Data Science',
    },
    'sub-2-1': {
      catId: 'cat-2',
      catName: 'Bisnis',
      subName: 'Entrepreneurship',
    },
    'sub-2-2': { catId: 'cat-2', catName: 'Bisnis', subName: 'Manajemen' },
    'sub-2-3': { catId: 'cat-2', catName: 'Bisnis', subName: 'Strategy' },
    'sub-3-1': { catId: 'cat-3', catName: 'Keuangan', subName: 'Akuntansi' },
    'sub-3-2': { catId: 'cat-3', catName: 'Keuangan', subName: 'Investasi' },
    'sub-3-3': {
      catId: 'cat-3',
      catName: 'Keuangan',
      subName: 'Cryptocurrency',
    },
    'sub-4-1': { catId: 'cat-4', catName: 'Desain', subName: 'UI/UX Design' },
    'sub-4-2': { catId: 'cat-4', catName: 'Desain', subName: 'Graphic Design' },
    'sub-4-3': { catId: 'cat-4', catName: 'Desain', subName: '3D & Animation' },
    'sub-5-1': {
      catId: 'cat-5',
      catName: 'Marketing',
      subName: 'Digital Marketing',
    },
    'sub-5-2': {
      catId: 'cat-5',
      catName: 'Marketing',
      subName: 'Social Media Marketing',
    },
    'sub-5-3': {
      catId: 'cat-5',
      catName: 'Marketing',
      subName: 'Content Marketing',
    },
    'sub-6-1': {
      catId: 'cat-6',
      catName: 'Fotografi',
      subName: 'Portrait Photography',
    },
    'sub-6-2': {
      catId: 'cat-6',
      catName: 'Fotografi',
      subName: 'Product Photography',
    },
    'sub-6-3': {
      catId: 'cat-6',
      catName: 'Fotografi',
      subName: 'Landscape Photography',
    },
  };

  Object.entries(templates).forEach(([subId, items]) => {
    const cat = catMap[subId];
    items.forEach((item) => {
      courses.push({
        id: `course-${id++}`,
        title: item.title,
        description: item.desc,
        categoryId: cat.catId,
        categoryName: cat.catName,
        subCategoryId: subId,
        subCategoryName: cat.subName,
        subCategorySlug: cat.subName.toLowerCase().replace(/\s+/g, '-'),
        imageUrl: `https://images.unsplash.com/photo-${item.img}?w=400`,
        instructor: item.instructor,
        rating: item.rating,
        studentsCount: item.students,
        lessonsCount: item.lessons,
      });
    });
  });

  return courses;
};

export const mockCourses: Course[] = generateCourses();
