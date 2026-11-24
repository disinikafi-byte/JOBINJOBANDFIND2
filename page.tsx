 "use client";

import { useMemo, useState } from "react";
import {
  Search, MapPin, BriefcaseBusiness, GraduationCap, SlidersHorizontal,
  Bookmark, Clock3, ArrowUpRight, CheckCircle2, Menu, X, Sparkles,
  Building2, UserRound, ChevronDown
} from "lucide-react";

type Job = {
  id: number; title: string; company: string; city: string; salary: string;
  education: string; experience: string; category: string; type: string;
  skills: string[]; description: string; featured?: boolean;
};

const jobs: Job[] = [
  { id: 1, title: "Staff Administrasi", company: "PT Maju Bersama", city: "Bandung", salary: "Rp3.000.000–Rp4.000.000", education: "SMA/SMK", experience: "Fresh graduate", category: "Administrasi", type: "Full-time", skills: ["Microsoft Office", "Teliti", "Komunikasi"], description: "Mengelola dokumen, input data, dan membantu kegiatan operasional kantor.", featured: true },
  { id: 2, title: "Customer Service", company: "CV Sukses Mandiri", city: "Bandung", salary: "Rp3.000.000–Rp4.500.000", education: "SMA/SMK", experience: "Fresh graduate", category: "Layanan", type: "Full-time", skills: ["Komunikasi", "Problem solving"], description: "Melayani pertanyaan pelanggan melalui telepon dan kanal digital." },
  { id: 3, title: "Junior Graphic Designer", company: "Kreativa Studio", city: "Jakarta", salary: "Rp4.000.000–Rp5.500.000", education: "SMK/D3", experience: "0–1 tahun", category: "Kreatif", type: "Full-time", skills: ["Canva", "Figma", "Desain"], description: "Membuat materi visual untuk kebutuhan media sosial dan promosi." },
  { id: 4, title: "Software Engineer", company: "Nusa Digital", city: "Jakarta", salary: "Rp7.000.000–Rp10.000.000", education: "S1", experience: "1–3 tahun", category: "Teknologi", type: "Full-time", skills: ["JavaScript", "React", "Git"], description: "Mengembangkan dan memelihara aplikasi web bersama tim produk.", featured: true },
  { id: 5, title: "Kasir Toko", company: "Ritel Kita", city: "Bandung", salary: "Rp2.800.000–Rp3.500.000", education: "SMP", experience: "Tidak wajib", category: "Penjualan", type: "Shift", skills: ["Ketelitian", "Pelayanan"], description: "Melayani transaksi pelanggan dan menjaga kerapian area kasir." },
  { id: 6, title: "Teknisi Lapangan", company: "Prima Teknik", city: "Cimahi", salary: "Rp3.500.000–Rp4.800.000", education: "SMK Teknik", experience: "1 tahun", category: "Teknik", type: "Full-time", skills: ["Elektronika", "Troubleshooting"], description: "Melakukan pemeriksaan dan perawatan perangkat di lokasi pelanggan." }
];

const educationRank: Record<string, number> = { "SMP": 1, "SMA/SMK": 2, "SMK/D3": 3, "SMK Teknik": 2, "D3": 3, "S1": 4, "S2": 5 };
const profileRank: Record<string, number> = { "SMP": 1, "SMA/SMK": 2, "D3": 3, "S1": 4, "S2": 5 };

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Semua lokasi");
  const [education, setEducation] = useState("Semua pendidikan");
  const [experience, setExperience] = useState("Semua pengalaman");
  const [category, setCategory] = useState("Semua kategori");
  const [activeTab, setActiveTab] = useState("Semua");
  const [saved, setSaved] = useState<number[]>([]);
  const [selected, setSelected] = useState<Job | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileEducation, setProfileEducation] = useState("SMA/SMK");
  const [profileExperience, setProfileExperience] = useState("Belum ada");
  const [profileSkills, setProfileSkills] = useState("Komunikasi, Microsoft Office");
  const [profileSaved, setProfileSaved] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredJobs = useMemo(() => jobs.filter(job => {
    const q = keyword.toLowerCase();
    const matchesKeyword = !q || [job.title, job.company, job.category, ...job.skills].join(" ").toLowerCase().includes(q);
    const matchesLocation = location === "Semua lokasi" || job.city === location;
    const matchesEducation = education === "Semua pendidikan" || educationRank[job.education] <= profileRank[education] || (education === "SMA/SMK" && job.education === "SMK Teknik");
    const matchesExperience = experience === "Semua pengalaman" || job.experience === experience || (experience === "Fresh graduate" && job.experience === "Tidak wajib");
    const matchesCategory = category === "Semua kategori" || job.category === category;
    const matchesTab = activeTab === "Semua" || (activeTab === "Fresh graduate" && ["Fresh graduate", "Tidak wajib"].includes(job.experience)) || (activeTab === "Disimpan" && saved.includes(job.id));
    return matchesKeyword && matchesLocation && matchesEducation && matchesExperience && matchesCategory && matchesTab;
  }), [keyword, location, education, experience, category, activeTab, saved]);

  const toggleSave = (id: number) => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const apply = (job: Job) => alert(`Lamaran untuk ${job.title} disimulasikan. Hubungkan website ke backend untuk mengirim lamaran sungguhan.`);

  return (
    <main>
      <header className="header">
        <a className="brand" href="#"><span className="brand-mark">J</span> jobmatch<span className="brand-dot">.</span></a>
        <nav className={mobileMenu ? "nav nav-open" : "nav"}>
          <a className="nav-active" href="#lowongan">Cari kerja</a>
          <a href="#cara-kerja">Cara kerja</a>
          <a href="#tentang">Tentang kami</a>
        </nav>
        <div className="header-actions">
          <button className="text-button" onClick={() => setProfileOpen(true)}>Profil saya</button>
          <button className="primary small" onClick={() => setProfileOpen(true)}>Buat profil <ArrowUpRight size={15}/></button>
        </div>
        <button className="menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Buka menu">{mobileMenu ? <X/> : <Menu/>}</button>
      </header>

      <section className="hero">
        <div className="hero-glow"/>
        <div className="hero-content">
          <div className="eyebrow"><Sparkles size={14}/> KARIER YANG SESUAI DENGANMU</div>
          <h1>Temukan pekerjaan<br/><span>yang cocok untukmu.</span></h1>
          <p>Setiap orang punya kemampuan yang berbeda. Temukan peluang kerja berdasarkan pendidikan, pengalaman, dan keahlianmu.</p>
          <div className="search-panel">
            <label className="search-field"><Search size={19}/><input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Posisi atau keahlian, mis. admin"/></label>
            <span className="search-divider"/>
            <label className="search-field location-field"><MapPin size={19}/><select value={location} onChange={e => setLocation(e.target.value)}><option>Semua lokasi</option><option>Bandung</option><option>Jakarta</option><option>Cimahi</option></select></label>
            <button className="primary search-button" onClick={() => document.getElementById("lowongan")?.scrollIntoView({behavior:"smooth"})}>Cari lowongan <ArrowUpRight size={16}/></button>
          </div>
          <div className="popular"><span>Pencarian populer:</span><button onClick={() => setKeyword("Admin")}>Admin</button><button onClick={() => setKeyword("Customer Service")}>Customer Service</button><button onClick={() => setKeyword("Fresh graduate")}>Fresh graduate</button></div>
        </div>
        <div className="hero-note"><div className="note-icon"><CheckCircle2 size={19}/></div><div><b>Mulai dari kemampuanmu</b><span>Filter lowongan tanpa harus punya pengalaman panjang.</span></div></div>
      </section>

      <section className="stats">
        <div><strong>6+</strong><span>Contoh lowongan</span></div><div><strong>6 kategori</strong><span>Bidang pekerjaan</span></div><div><strong>100%</strong><span>Fokus pada kecocokan</span></div>
      </section>

      <section className="jobs-section" id="lowongan">
        <div className="section-heading">
          <div><div className="eyebrow dark">PELUANG UNTUKMU</div><h2>Lowongan pekerjaan</h2><p>Pilih pekerjaan yang sesuai dengan kualifikasimu.</p></div>
          <button className="outline profile-cta" onClick={() => setProfileOpen(true)}><UserRound size={16}/> Atur kualifikasi <ChevronDown size={15}/></button>
        </div>
        <div className="filter-layout">
          <aside className="filters">
            <div className="filter-title"><SlidersHorizontal size={17}/><b>Filter pekerjaan</b><button onClick={() => {setEducation("Semua pendidikan");setExperience("Semua pengalaman");setCategory("Semua kategori");setLocation("Semua lokasi");}}>Reset</button></div>
            <label className="filter-label">Pendidikan minimum<select value={education} onChange={e => setEducation(e.target.value)}><option>Semua pendidikan</option><option>SMP</option><option>SMA/SMK</option><option>D3</option><option>S1</option><option>S2</option></select></label>
            <label className="filter-label">Pengalaman<select value={experience} onChange={e => setExperience(e.target.value)}><option>Semua pengalaman</option><option>Fresh graduate</option><option>0–1 tahun</option><option>1 tahun</option><option>1–3 tahun</option></select></label>
            <label className="filter-label">Kategori<select value={category} onChange={e => setCategory(e.target.value)}><option>Semua kategori</option><option>Administrasi</option><option>Layanan</option><option>Kreatif</option><option>Teknologi</option><option>Penjualan</option><option>Teknik</option></select></label>
            <div className="filter-tip"><Sparkles size={17}/><b>Tips JobMatch</b><p>Lengkapi profil dan keahlianmu agar lebih mudah menemukan lowongan yang relevan.</p><button onClick={() => setProfileOpen(true)}>Lengkapi profil <ArrowUpRight size={14}/></button></div>
          </aside>
          <div className="job-results">
            <div className="results-top"><div className="tabs"><button className={activeTab==="Semua"?"tab active":"tab"} onClick={() => setActiveTab("Semua")}>Semua</button><button className={activeTab==="Fresh graduate"?"tab active":"tab"} onClick={() => setActiveTab("Fresh graduate")}>Fresh graduate</button><button className={activeTab==="Disimpan"?"tab active":"tab"} onClick={() => setActiveTab("Disimpan")}>Disimpan ({saved.length})</button></div><span className="result-count">{filteredJobs.length} pekerjaan ditemukan</span></div>
            {filteredJobs.length ? filteredJobs.map(job => (
              <article className="job-card" key={job.id}>
                <div className="company-logo"><Building2 size={23}/></div>
                <div className="job-main">
                  <div className="job-title-row"><button className="job-title" onClick={() => setSelected(job)}>{job.title}</button>{job.featured && <span className="featured">Pilihan</span>}</div>
                  <div className="company-name">{job.company}</div>
                  <div className="job-meta"><span><MapPin size={14}/>{job.city}</span><span><GraduationCap size={15}/>{job.education}</span><span><Clock3 size={14}/>{job.experience}</span></div>
                  <div className="skill-tags">{job.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
                  <div className="salary">{job.salary} <small>/ bulan</small></div>
                </div>
                <div className="job-actions"><button className={saved.includes(job.id)?"save-button saved":"save-button"} onClick={() => toggleSave(job.id)} aria-label="Simpan lowongan"><Bookmark size={18} fill={saved.includes(job.id)?"currentColor":"none"}/></button><button className="details-button" onClick={() => setSelected(job)}>Lihat detail <ArrowUpRight size={15}/></button></div>
              </article>
            )) : <div className="empty"><Search size={28}/><b>Belum ada pekerjaan yang cocok</b><p>Coba ubah filter atau kata kunci pencarianmu.</p><button className="outline" onClick={() => {setKeyword("");setEducation("Semua pendidikan");setExperience("Semua pengalaman");setCategory("Semua kategori");setLocation("Semua lokasi");setActiveTab("Semua");}}>Hapus semua filter</button></div>}
          </div>
        </div>
      </section>

      <section className="how-section" id="cara-kerja">
        <div className="eyebrow dark">MUDAH DIMULAI</div><h2>Tiga langkah menuju pekerjaanmu.</h2>
        <div className="steps"><div><span>01</span><GraduationCap/><h3>Lengkapi profil</h3><p>Masukkan pendidikan, pengalaman, dan keahlian yang kamu miliki.</p></div><div><span>02</span><SlidersHorizontal/><h3>Temukan kecocokan</h3><p>Gunakan filter untuk melihat lowongan dengan persyaratan yang sesuai.</p></div><div><span>03</span><BriefcaseBusiness/><h3>Mulai melamar</h3><p>Pelajari detail pekerjaan dan hubungi perusahaan penyedia lowongan.</p></div></div>
      </section>

      <footer id="tentang"><a className="brand" href="#"><span className="brand-mark">J</span> jobmatch<span className="brand-dot">.</span></a><p>Temukan peluang. Kembangkan kemampuan.</p><span>© 2026 JobMatch. Prototype website pencari kerja.</span></footer>

      {profileOpen && <div className="modal-backdrop" onClick={() => setProfileOpen(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setProfileOpen(false)}><X/></button><div className="eyebrow dark">PROFIL PENCARI KERJA</div><h2>Sesuaikan rekomendasimu</h2><p className="modal-intro">Isi data berikut untuk menyaring pekerjaan berdasarkan kualifikasi. Data ini hanya tersimpan sementara di halaman ini.</p><label className="filter-label">Pendidikan terakhir<select value={profileEducation} onChange={e => setProfileEducation(e.target.value)}><option>SMP</option><option>SMA/SMK</option><option>D3</option><option>S1</option><option>S2</option></select></label><label className="filter-label">Pengalaman kerja<select value={profileExperience} onChange={e => setProfileExperience(e.target.value)}><option>Belum ada</option><option>0–1 tahun</option><option>1–3 tahun</option><option>Lebih dari 3 tahun</option></select></label><label className="filter-label">Keahlian yang dimiliki<input value={profileSkills} onChange={e => setProfileSkills(e.target.value)} placeholder="Contoh: komunikasi, Excel, desain"/></label><div className="modal-actions"><button className="outline" onClick={() => setProfileOpen(false)}>Batal</button><button className="primary" onClick={() => {setEducation(profileEducation);setExperience(profileExperience==="Belum ada"?"Fresh graduate":profileExperience==="Lebih dari 3 tahun"?"Semua pengalaman":profileExperience);setProfileSaved(true);setProfileOpen(false);}}>Simpan profil <ArrowUpRight size={15}/></button></div></div></div>}

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal detail-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><X/></button><div className="company-logo large"><Building2 size={27}/></div><div className="eyebrow dark">{selected.category.toUpperCase()}</div><h2>{selected.title}</h2><p className="company-name">{selected.company} · {selected.city}</p><div className="detail-salary">{selected.salary}<small> / bulan</small></div><div className="detail-grid"><div><span>Pendidikan minimum</span><b>{selected.education}</b></div><div><span>Pengalaman</span><b>{selected.experience}</b></div><div><span>Tipe pekerjaan</span><b>{selected.type}</b></div></div><h3>Deskripsi pekerjaan</h3><p>{selected.description}</p><h3>Keahlian yang dibutuhkan</h3><div className="skill-tags">{selected.skills.map(s=><span key={s}>{s}</span>)}</div><p className="disclaimer">Informasi lowongan pada prototype ini merupakan data contoh. Pastikan memeriksa legalitas perusahaan sebelum mengirimkan data pribadi.</p><button className="primary apply-button" onClick={() => apply(selected)}>Ajukan lamaran <ArrowUpRight size={16}/></button></div></div>}
    </main>
  );
}