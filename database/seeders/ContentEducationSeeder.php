<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContentEducationSeeder extends Seeder
{
    public function run()
    {
        $educationContents = [
            [
                'title' => 'Pentingnya Vaksinasi untuk Anak',
                'content' => '<p>Vaksinasi adalah salah satu cara paling efektif untuk mencegah penyakit berbahaya pada anak. Berikut manfaat vaksinasi:</p>
                            <ul>
                                <li>Mencegah penyakit serius seperti campak, polio, dan difteri</li>
                                <li>Membentuk kekebalan tubuh</li>
                                <li>Melindungi anak-anak yang tidak bisa divaksinasi</li>
                                <li>Mengurangi penyebaran penyakit menular</li>
                            </ul>
                            <p>Jadwalkan vaksinasi anak Anda sesuai dengan kalender vaksinasi yang direkomendasikan.</p>',
                'type' => 'education',
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Pola Makan Sehat untuk Keluarga',
                'content' => '<p>Pola makan sehat penting untuk menjaga kesehatan seluruh keluarga. Berikut tipsnya:</p>
                            <ol>
                                <li>Konsumsi buah dan sayur 5 porsi sehari</li>
                                <li>Batasi gula, garam, dan lemak jenuh</li>
                                <li>Pilih sumber protein sehat seperti ikan, ayam, dan kacang-kacangan</li>
                                <li>Minum air putih cukup</li>
                                <li>Sarapan pagi yang bergizi</li>
                            </ol>
                            <p>Dengan pola makan seimbang, risiko penyakit kronis dapat dikurangi.</p>',
                'type' => 'education',
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Pertolongan Pertama pada Demam',
                'content' => '<h3>Langkah-langkah menangani demam:</h3>
                            <p>1. Ukur suhu tubuh dengan termometer</p>
                            <p>2. Berikan minum yang cukup untuk mencegah dehidrasi</p>
                            <p>3. Kompres dengan air hangat (bukan air dingin)</p>
                            <p>4. Berikan obat penurun panas sesuai dosis</p>
                            <p>5. Kenakan pakaian yang nyaman dan tidak terlalu tebal</p>
                            <p><strong>Segera ke dokter jika:</strong></p>
                            <ul>
                                <li>Demam >39°C</li>
                                <li>Disertai kejang</li>
                                <li>Tidak membaik dalam 3 hari</li>
                                <li>Pada bayi <3 bulan</li>
                            </ul>',
                'type' => 'education',
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Manfaat Olahraga Rutin',
                'content' => '<p>Olahraga teratur memberikan banyak manfaat kesehatan:</p>
                            <table class="table table-bordered">
                                <tr>
                                    <th>Manfaat Fisik</th>
                                    <th>Manfaat Mental</th>
                                </tr>
                                <tr>
                                    <td>Meningkatkan kebugaran</td>
                                    <td>Mengurangi stres</td>
                                </tr>
                                <tr>
                                    <td>Menjaga berat badan ideal</td>
                                    <td>Meningkatkan mood</td>
                                </tr>
                                <tr>
                                    <td>Memperkuat tulang dan otot</td>
                                    <td>Meningkatkan kualitas tidur</td>
                                </tr>
                            </table>
                            <p>Lakukan olahraga minimal 30 menit sehari, 5 kali seminggu.</p>',
                'type' => 'education',
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Pencegahan Penyakit Jantung',
                'content' => '<h4>Langkah pencegahan penyakit jantung:</h4>
                            <p>1. <strong>Tidak merokok</strong> - Merokok merusak pembuluh darah</p>
                            <p>2. <strong>Kontrol tekanan darah</strong> - Target <120/80 mmHg</p>
                            <p>3. <strong>Kontrol gula darah</strong> - Cegah diabetes</p>
                            <p>4. <strong>Diet sehat jantung</strong> - Kurangi lemak jenuh</p>
                            <p>5. <strong>Aktif bergerak</strong> - Minimal 150 menit/minggu</p>
                            <p>6. <strong>Kelola stres</strong> - Teknik relaksasi penting</p>
                            <p>7. <strong>Cek kesehatan rutin</strong> - Deteksi dini faktor risiko</p>',
                'type' => 'education',
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        DB::table('contents')->insert($educationContents);
    }
}