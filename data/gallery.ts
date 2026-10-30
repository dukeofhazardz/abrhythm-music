/**
 * Gallery data model — photos organised by year.
 *
 * Images come from Google Drive. Two loading modes exist in lib/drive.ts:
 *  MODE A (automatic, preferred): folderId + GOOGLE_DRIVE_API_KEY → the
 *      folder's images are fetched server-side via the Drive API v3.
 *  MODE B (manual fallback): the file IDs listed under `images` are used
 *      directly as drive.google.com/thumbnail?id=… URLs.
 *
 * No images are invented: every id below was supplied as a Drive file link.
 * 2024 has no images yet — it renders a designed empty state.
 *
 * TODO: paste each year's Google Drive folder link next to `folderUrl` below
 * (folderId is extracted automatically). Without folder links the page runs
 * in MODE B using the manual file lists.
 */

import { extractDriveId } from "@/lib/drive";

export type GalleryImage = {
  id: string; // Drive file ID
  alt?: string; // supplied alt text; otherwise a generic "photo, YEAR" label
};

export type GalleryYear = {
  year: number;
  title?: string; // optional short label — only if supplied
  folderUrl?: string; // Google Drive folder link for the year
  folderId?: string | null; // extracted from folderUrl
  images?: string[]; // manual list of Drive file IDs (MODE B fallback)
};

export type GalleryYearEntry = Omit<GalleryYear, "images"> & {
  images: GalleryImage[];
  imageCount: number;
  /** True when the count came from real Drive data (MODE A). */
  countFromRealData: boolean;
  error: string | null;
};

type RawGalleryYear = Omit<GalleryYear, "images"> & {
  images?: string[];
};


const RAW_YEARS: GalleryYear[] = [
  // 2022 — manual image list (45 photos supplied).
  {
    year: 2022,
    images: [
      "1qZwQx6vrlWEBdS2JPz21y9e_gF5yLU74",
      "1Hm1DtTnkLRdwti-Z8rXJRJCnvBZE3dB5",
      "1FR7OIg6OJZENl8xQQ7DIElDIcHIf_VIh",
      "1lf0Tdt2rhdxM-J2-nzcm6hU2jkzTTFzh",
      "1xXJ7difCU-2O5lDDxcpzZ7vYcQsgxZPb",
      "15MWRJlt4Q4bIurQMid3g38CL-fZiOX99",
      "1ychH-AeuG83sGX0n6F8GqXeyUljbFRU_",
      "1bcHq5MvbA3-ElWQY9sKrDxCjTKLlAaZa",
      "1_2SbdgT5Er-6SriOLryj--oOtzBbnfT8",
      "1g80DbnyQSahZiR3QC1HNP2KfjVO9NU6D",
      "1eVWTfmMg_IV7UNbercectXMKXWyLzA9s",
      "1u0ZXlxmKMuU_8tQJrVA_zvV9Kv6KXpxF",
      "1GDKNe7eyh3jGzmI-6pQtKVOYuYTMGSfh",
      "18GceleBUtYJWwaWZlptEZrD3z52JCsq-",
      "16_lMNDrrNl3J1PxMlE-Yb9oBc0p5d4mD",
      "158jDa2qRR9umY0wxH69nqzjUf8smuBlw",
      "1MB4DIEiHNFk7lZlHU9IbA0IK-4drfm-X",
      "1LqZDwHdnNhIFBO82uVMkxigctozGhQJe",
      "1m-r5C1-29TUlINW9WEePUJ9FW6NZwnlo",
      "1eIYVI4W01heyZTbxhiuQ5kdCTxwNka_t",
      "1b4e6AnhZdKmR-RF2XXFOuwViVkqgM6Uk",
      "1UTRIf3j6DCAejMLytwMzGJTY2tQdOfPp",
      "13QmXtASDAdZg7s57TnK1Z__Nl4l4thl9",
      "1xenGTGIuz9lci111gQENaBHbhjmj-tke",
      "1wmrC9HrB6dUpZ_5rAmy80o6kIm5a_g71",
      "1S9U0lHxUckDGt_wAizyDBYM4JrumguwQ",
      "1NSFxWs0bFAwm23FU5lRTNWnUeUOjdg4N",
      "1C_50LRjgfFf5fwedrvTQ7kmL2Mk5K10f",
      "1YKUex3qiSpkAAQrqOa-WxMfxbqkQO-Gd",
      "1EITK9EXWqCwiPox9tbzq5WcvE8emQz24",
      "180WwzQvYen_HzwFsbMqW0SVIrjcOGb7A",
      "1sf3EI6X0VQHKY36YNZWEJ5R08TQalwa_",
      "1upQywLBjo_mqwSkXkuU1edrJn6vFPjj7",
      "1ucIicUD_h5Q_NBzNu5moGuUYgI32E__8",
      "1pk_3br5YviQ3mb6MWoG2uh6ntSVE9WSD",
      "1oB3X38SqSX5SLBs_mg9HBx7aMJdgwAYc",
      "1VqN9M2q7IoYl2-6TtpNSqP4tDT1-9pRO",
      "1lEJyKe13nJ_w6uDbb9Hj9oBKQ5vEMYi5",
      "1tORKRKNZptywVEasxweD-8K1AYwnaPj5",
      "1-O2mYZ_ILtTt7eMXHILAWs91WfW4Q3v4",
      "1kbdPNMj-SH82gLBgO3FA_hNGeFZoeqWr",
      "117TiLj_VP6Z-F4AOesmu1DixPpE8Xk7V",
      "1P5-wIk6fZbWiMFWHZYedlNEYCbLUnlSt",
      "1L3s9cknHV5PvFUJqIY69VBVvKk42UPL0",
      "1HtqGgVRcSP-E2A3jebBSGxciJ3ZI7LHG",
    ],
  },
  // 2023 — manual image list (37 photos supplied).
  {
    year: 2023,
    images: [
      "1eCEUWF-7idh6CeFCrc6set2M5EuSsBj1",
      "1KGqznXbLIUtXtHcdUbx91Yt1asyYTFvV",
      "1gkaJDR3bPe28Vzk7KJ9P7CT6zt_SLuGW",
      "1gvTYVJpbRa3QJpSfvL3vgJdSfht_h-m8",
      "1AjhgRzfPJ7nAM62Dj48SMKN9AsU9Tgn6",
      "1IYEYq86xXoY1NWUOqBQHU9fhpVZecasU",
      "1zE6eJVdCNP3geDa3yc18k_qnGBglN4Rx",
      "1JaPyvjZZSAZJR1aoSCovB8tsx1liwk5b",
      "1opKaLi-mJR-7XitvB-YqvdXnW_144-kt",
      "1h66Nc8OkmOnVLBR8TyXSxCjtmhn39yOX",
      "1MfxHZWunUmGgg73CPNTUNyRZYTlqL9KF",
      "12hX5z2bWRiBDdJh-0Q0jDUet1MUuXNkh",
      "1uuQ3POwdbO0Nx_3EuqpamfE_mqw5Q4yI",
      "1yVSlobZ1reJDu3pCGPVc1Q7FHeJ4JoRV",
      "1zG4OGqkX5ytXpP0FAVW4arN476bAf_se",
      "1f9QZrU9h09Aae4PAVFyCii7V4npEzL1W",
      "1B3SzLLjNdkRu_nUvCfy1nG_vRvXkcjh9",
      "1U1tfyOYFXMajq0kH-rjEaQmgU44dVQid",
      "1eXbhzkPp1a-D6Fr0dvXI1Qku_eyHtD4k",
      "1w88R4sSslFYI0mPEobcjvehqiE6FvYXm",
      "16cylw_fZB9cA98PVUeJ0oeLSVcJJlLsS",
      "1MMx5OcdJGdhv8AwRVEspTOC0J4KrG5C7",
      "1U1v1Xv0sY7ybSv2G9gWl3fXc9QR6UYj8",
      "1jh9dtXXqCR7z9rgyjkHM3H1RXQWBjUQX",
      "1BS5XHtDF_qhTw6qjYIQ2fQDyFeMFJFQu",
      "1w_tLgPQLIgq1SKQVgh2nwErUAYUHul4W",
      "1fG5ZZ_YPdBNPWiBI6w80OZ7lY-AcjSt5",
      "1Dh-DIk2Ef_l1yi4UW7nA3NxZK9ZTiNGE",
      "13BKRA21fnbQpe8J9Ogj4bmBFV_zfsS5V",
      "1VlMLIGwRaGJ4hor9qw0obL1Au913Ij5z",
      "1aR4MRFITmwVN4ru6FBaAzLAaEFY_lvNA",
      "1VosOL5d-xtoXvH5SuR0Gy5FQLEXAhiRs",
      "1ixNjmA4WifbbuswPs4baJeKCFV9hAL5P",
      "14EfqdTs_meqIhLNMQvc93-8UwqOjoyFL",
      "1zEQ-6fXDyMzIDxBLma-PIwhvQdWG3-8q",
      "1SWbb3KaVxhyFfq6aLgOpBPsSqqiryBZ6",
      "1jfl2CVAZEvDBrSwOVREFjCtG8j1sS7vy",
    ],
  },
  // 2024 — no photos yet. TODO: paste a Drive folder link above to enable MODE A.
  { year: 2024 },
  // 2025 — manual image list (88 photos supplied).
  {
    year: 2025,
    images: [
      "1cb6BAU6cQuD-fog7u5E-Vmb3sRLFP4YG",
      "1cMgvHt4VN18AoQQp9kcIp4S4-Ckuzwo4",
      "1h1Qsjuo-pXv6cSHgOU1Yj4W1qJLWmMpd",
      "1ee7rswWhFNwh08yTrfC-wzudNvN3jX6z",
      "1l85V5TnjzePJlNmIeQ0YRLqrV_JMy--L",
      "12YBM99ZKIxf65OkHDjGeBh3z5MhVLncC",
      "13yzmYcp8hl8Bl2FTxJ8Lpxtar3ZK2tnH",
      "1n6XtlIQyMzV8MxAvXaFanP2NTkBoj67I",
      "1TNl4Xt_ocwM8eATQDZELNhapCk1CB9EK",
      "1ZG53D2o0A9JFhExvIwlWFJHYJeUVB4Gv",
      "12qsZ14xKV46N8rHPwaA0B7CIYVM0J6t0",
      "1WgJnzZ0FJ1Wam0Kws5P0YRym5K5P0bKr",
      "1IUne5YIU2OkggBKKfDvHAXAXLiSzcQQ3",
      "1DSzaxAPDUJxFL1gxClvVe0JjBADAIwZ4",
      "1qJKssNx6veaqb2EajxNmnPQag4oC_J3M",
      "1qtCpRkTgmvH1I1pAr9mzprkjuNOTWp2N",
      "1LskCDNKjilkr6Hvz53gGIHdKW763CmnD",
      "1bRdpnuMl0VYFBNmhMsSzxpNlnRgrDqCl",
      "1FWw40bQ1IJG4TjAcAy_pFQUV0oDC7jvb",
      "1OB6ZjNHI3oU5GtN7CEwKOAMAArT2Akac",
      "1hNvHepdRuInliWnBasO_Yoe9snIAkttD",
      "1Os1ZqbXO3tAePy6DET3C5TeHB9_ygvM6",
      "1MwAt9S5Z-HpcF1PehqB5-OjjnfDYK4G_",
      "1PLgk4V4xPPKcMehQhJgqUPNV-ja7F9Or",
      "1bMqsSycGk5N7vfIELgG7j1vouu4-GIiK",
      "1zPn4Vx6y0siruO3O1xLkrvCsNrA3alj9",
      "14_cRA5Ulq2wXaJTYwl652bcsfFf1t7Ao",
      "1El1Co6nTD7Ax1bifU8mRUOhYs8CNF36z",
      "1yIcIkywlXjdlrefLeF1jprOf_Lk5Rc5U",
      "1Q2JOnsCjtoOcsi10BSB4wSvKdFh3fAlR",
      "1cP6bta8byFGQQjHNgcQJX9HK604YJyAe",
      "1qDtNRWdUY0xlcKXLXjRjDTbTi526865n",
      "1w4xtH6wUAVWwdDvxN18Q1rvVPbtXKTS6",
      "1Nx-iqg70abM8sPcfqgfDhdWl7E1g8HBM",
      "1O7jPf9y-xskDvzj-sRfJkjbfiYYFakRG",
      "1R9y3OKweZBETyoduCrlt9F2vnif_3g5P",
      "1RniwhUWnvEaWICydE_BQ3JalmuHBqPN1",
      "1_W06X1BnerQg9AVNSXRUsO4EBzIbBkub",
      "1PcoWGVIyDsYTl20ckK0jUoS7fUst3P7m",
      "1pDvkgTInpKlwJhEjyQBUKoIVS8ygg0nk",
      "1xlMF9d6YPshPPCw6Oxe_DXRQszt13arV",
      "1-Ft7GtI5_CqMIrgVR_z3FqpiY64N0Q5w",
      "107JaMmcaxBJdZhS6LJP9V6dQdJQs02gw",
      "1pqadiqjLqWIbD4EB6g30kt7m-Ss8KRUU",
      "1q5lSnoul6sM4AkRiCvo8W4KJ22ahasBN",
      "1rsmGQv1IUSlupsuoi9rrTbxqkRhhL2v1",
      "1l3SCEiqNysakzFDYQEYagcCRaqcDPc3S",
      "1ePsSEazrYct8elR6WqB1ywvlIS1pkA5Z",
      "17uY57BPkW-tbkDZK2IkmNlv_EjPwRfyQ",
      "1Cv1jHw0sj1bzbJrfli47UILDEtyHsPqp",
      "1wQY-jqwlOPNdgGeza9WKzDE8dBKCGZA8",
      "1Hl6tvzsZQuKxGmUuO3SURVrrCyTLwy_T",
      "1abJHIUE4PLoOQx-HSX_UaSkDD_L3Qzkm",
      "1hWfZJDJkTFq3xjfipy-NhYMUauTATyFU",
      "1VxyWXq-TLluRUhU5-Fmbkuvvo8EvxI8x",
      "1_L_sh_GkXogorw0HN_XUHNeP3uWwNzzw",
      "1WkuA3M6g4XNygyqZ2Jm7tFDxRs7iu6Ru",
      "1f-U_T4FGNJEz3ovxznwKUlSzmW4esZqy",
      "1dGUzG-61TK1Z1wuW_LDUU_U_U7IuXKFh",
      "1ZLbUoPVbnyXHbjSuJqB3s54mInOf3zXg",
      "1MgoK0i7ADV5MpuM4Md59vvRgRpgfObhN",
      "1J542Uu5DWiJE4QCwR-YnoDLw1YHy5Ttb",
      "1pCv5fx9F66oe8fVIAkYcWUE1eCZgrsBO",
      "1dWR7jWpBYsrW3XDocSIjV1-jIW0sF3Ct",
      "1RljgsUS50VKBLNkNBmY5QpRe7t30H2jf",
      "1lod0Id0WO-n-AMadeK9WKdWTmkiYLVvY",
      "1PsVCHFOK0Bg8gReCaLTqDX5SCw-00OXv",
      "1pTbiQf_JyPeiZ0n7WK8gfgnNpAwYRPl5",
      "15DPwi9xczACWTm0PaCATP9a6H7HH1O7_",
      "1cs29twQ2WoOTj2Zar_4sbz4KYe18FPrk",
      "1RPfBhG6DpgEDO8xi88hqUmrSs_ZcCp1X",
      "1phkKDYEG2_GxfAVzVhJOt6O2QCgg0gJU",
      "109g28HC1hSexCLkRL0teunUXMzDvJ-Jk",
      "1H5aCBRkERI9raWf87U5MCEqq6Abc6mfw",
      "1by4pxuW_mAnRlNbEgHGZK7dfnt1F3niX",
      "1vyJGu8FMhCS3c03nvcd_8ei4eb-76fUc",
      "1OuoCAO2cut4lTbvhJ6YItNeIvbMb2dHD",
      "1JMh-CGRJjkl0G40Gy6vZY2ou-OwxE8ml",
      "1OZ2s8KMXbPXAclvoxeKTtF9HLWHkEMI3",
      "1jw0dmU3l9TaurElP-3rz1kPjyzCcCEWE",
      "1Ow8WTn81h8f0pzA1NIhn9PT-FvSKxvvF",
      "17wpzchNo-FMp5EZ27xlsp7EUVjFNNUES",
      "1L14gGZEsjLq0Z85hbA2voxSqK2_zIylF",
      "128Ez_CR80VLDsJWpiAk0dMuZ5tT5ohFk",
      "1KWukXy1f7-ak3V6xxpWsw8gpPQP2jPDW",
      "1CTWxthdbCzmvyWyh90TQsOAy51IFXk_Z",
      "19zup6bYG0JGScHO-ctFpHmqsOAOfwyUZ",
      "1jnNWPyaGYE_yIhka04gy_XZbBuujI9hh",
    ],
  },
  // 2026 — manual image list (75 photos supplied).
  {
    year: 2026,
    images: [
      "1ei8upJqFSFTh0k4zz9bgXAYkGOApRPLP",
      "1sAqaBvQHLo6nnfT8ozS61LldOndOEutk",
      "12WlxvjY4YyNZOl8Etrj9D3N5HjLO0vlK",
      "1E7Cm0fBd0NND2xb-7t67xXz2baQacDzQ",
      "1p6ax9198n7ADi5S5OPT5RTXi9M2RTvmV",
      "1uT34VNfWoyLfyd6VFJnfinPH1A7r0TKd",
      "1Q3laOMn8CBa26SAeUGYwBsqad-JMQ7mT",
      "1n9mjodTjTV-FDFepAP0tOABUFZgTNZ5F",
      "1GnmFXl7TWer3L7hNIpAnppIV0NhS8VBu",
      "1qjYNC-GLRZqmJb_WqQIminwJjH8-8Wwp",
      "1qWULk6f2TWLMxHsRh4akwvRgbveL-H_l",
      "11WTx4qyMOpjjy9TgTtYpfgoyRkqqUFNZ",
      "1qjGaO4E1mRE5mcZR1mQgTono6KlN8Mw_",
      "1NpCYhFnCyMo3-bIYQqOVX2ihVFwG42Yp",
      "1tyPR8ovdyb8MlUfPkyHLJjw3RhJ9e9_z",
      "1h7kqcJjUJO3E0BClWjo-kqq_2mCQQFXB",
      "1L0A5TYQg_3HQH2nhKyoc3P2arpUVI1hd",
      "1VtktvR4SMwMFyjQ07yNF8RSwGX74W9Ce",
      "1aQoJEYCq3j5cGoDT-D7LHCwJWz4tsRFc",
      "12xL1mT-DbV9qUEBvgyVHL95bgEQeHWDo",
      "1wBvBI2fAel5PGapuxUE24tq0V3--aw1E",
      "1dQXbqrgYvKwxC5zv-RIDlKSM7Wi1cxLs",
      "15GWf17v3-2BMaxISky_QrQxDelPH2TQ-",
      "1F5gGs2B-OOiCpJJNjBKFoiAyc5sTp8Rj",
      "1ggWNqFt2lLTTr868GE7081bwZlF3RLmM",
      "1LyeD00A32CDlSNgHJzQe1X8BbPGDzPUB",
      "1sawLNKW1J7NPDyIvNI9JeU3QyvBeronX",
      "12BJkYp3CArSNqqRwZbKd4_p34OzjdROc",
      "1sd5XkkK_IJPeqvkM2ehN37hYpHQKG1E4",
      "16ylT8tiqHQHQAd2o8AN5LK5i9zIZ5gW_",
      "1r9fLHGSyda7c62ALUnbDUntpE6zkjtJ0",
      "1R6rgzcEsq84Kf8NjMllLSsfXqHBWrWRr",
      "1yz0jbVg8vetmM-5DqqiOZsVXVnKVwN6z",
      "1J1QhwE6wCupPhZrmBBGXCqFD15K9FXTI",
      "1N9LPe5kDZBDXV1b3c8SA4nSPGjjUaVZ_",
      "1GB7Y-OzIvJ4F4yWjlunsWsGGL9_1HLyn",
      "1ImoZ8n9ZJmLkhMi1Qq8wyoijhkYzetAv",
      "15iuj_s4bpRr5OR_PwNHwKTSMHs75KidJ",
      "1VX42vfUMVNnmGmIxxJq0b1QkHYaTUthL",
      "17Cz0PMXz__yju9u9e6RR22NkkdSHoVP7",
      "1Eb6ClNkiL4R4OOK9-ZyDiBCSzdFNg6Ea",
      "1m_b22ZzNAJ0RXhjJQaQI7auPgW0aYuxD",
      "1KhvbFvKvh5OATdP8yj7jlOSn4JKodhtQ",
      "1fErZ_9DQ4xMg_9x1mfQka0PSZbvcj0EO",
      "1RHR0E9qPcPaEzoSVyjmwAEyPKhVjAJNx",
      "1mzBPbnN-javsmUeKMy0kgC5loxtXgCYx",
      "1GOQ5XmP6pwGMl6j0LzQChdmgjDw5g8L7",
      "1-c8wVTc5STrdR65V-eQXkbFKWtM2gEQk",
      "1o2F1fmC1H1yuzurjH3umRu2HGJEzEFSZ",
      "14I03SL5iL6K9se676psygNgNECyZ7pRW",
      "10VvFR8px3NUcA6LQ5HUrmyEKUMgD4Mra",
      "1KMgkbQkUE_5G0W_njBwyMe3tgQOVxR00",
      "1kUAiYnyxo3-KSdqucZlJKep4Mv6qOhVn",
      "1oXO2-8jXP8Oxeg9CnZ2caB8WPxxVKFNO",
      "1brwxerrWesZt2Z_zo3W8s6NCYkFSsTZY",
      "1qEREEzGEiFcD53ZREHPk59bKPmvpim0P",
      "1SZEUb6BLzDzVCZWA4sMrvb_3cmppmqs7",
      "1vV_lf5mEUKz2trIi2JrFLS7GFGuUUjQS",
      "1lbu_AN4r01_CLwf23NDa5iE_q1L_tte2",
      "1Bg3W9lI0V_5nRrhdbnox86JFmoUh5fPD",
      "1kECaFfSMrxbDSzWvpEbrEzAyo0CooTwN",
      "15fpVTXZAzyyAR_C2EFtr93vTjj_qLEsF",
      "1M-BbefDrr0LVVe5CI2tkk5zTr4-mtggl",
      "1F9n3m61vY8YetyxfWuGcCF9jKITn9-bE",
      "1ICPuaB_FlyOwi7F3YXdQSSfJaK9hqvyR",
      "1Tg75OR5FvsPMzYcoGMC9TvJEV4KwJNwv",
      "1XV0Xur-YNVtM2IaxyDEwfgb7_YJF5zSZ",
      "1AMQ3M7xt9qBLjwvEF01gXRemGB1T2LjY",
      "11MCSXacoJ-VIFEUar_T2njEwJjqa9bx3",
      "1uhsAExY-2CtPzjfDHQ1HYvpz0K3lwS5P",
      "1zyh9BG1xy4_6txuR_Wbx_drBU2oLyrDP",
      "1xEQp7dgTG4LsljTIZ0EuG52SCrCMnN8O",
      "1zOTaYVJiOJDusclRSYycXFEsOrVviXLZ",
      "1YromTKRVqh2M4EPLB8rYGisqktcg1SmQ",
      "1pmQ-Jk-K8Sy1bbOc4HBC8LCJX6oDZSN5",
    ],
  },
];

/**
 * Normalise raw year entries: extract folderId from folderUrl, convert the
 * manual ID list to image objects, and attach derived entry fields.
 */
export function normaliseYears(raw: RawGalleryYear[]): GalleryYearEntry[] {
  return raw.map((year) => {
    const folderId =
      year.folderId ?? extractDriveId(year.folderUrl ?? "") ?? undefined;
    const images: GalleryImage[] = (year.images ?? []).map((id) => ({ id }));
    return {
      ...year,
      folderId,
      images,
      imageCount: images.length,
      countFromRealData: false, // set to true by the page when MODE A succeeds
      error: null,
    };
  });
}

/** All gallery years in chronological order. */
export const GALLERY_YEARS: GalleryYearEntry[] = normaliseYears(RAW_YEARS);
