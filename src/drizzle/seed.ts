import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { lesson, lessonWord, word } from './schema';

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

const seedData = [
  {
    day: 1,
    titleVi: 'Chào hỏi & Tự giới thiệu',
    grammarPoint: 'はじめまして、〜と申します。',
    grammarExplain: 'Xin chào lần đầu gặp mặt, tôi tên là ~. (lịch sự)',
    passage: 'はじめまして、グエンと申します。　フロントエンド開発を担当しています。　同じチームのメンバーとしてどうぞよろしくお願いします。　日本語はまだ勉強中ですが、ご指導よろしくお願いします。',
    vocab: [
      { ja: '開発者', kana: 'かいはつしゃ', vi: 'Lập trình viên' },
      { ja: '開発部', kana: 'かいはつぶ', vi: 'Bộ phận phát triển' },
      { ja: '担当', kana: 'たんとう', vi: 'Phụ trách, đảm nhận' },
      { ja: 'フロントエンド', kana: '', vi: 'Front-end' },
      { ja: 'バックエンド', kana: '', vi: 'Back-end' },
      { ja: 'よろしくお願いします', kana: 'よろしくおねがいします', vi: 'Rất mong được hợp tác' },
    ],
  },
  {
    day: 2,
    titleVi: 'Họp standup hàng ngày',
    grammarPoint: '昨日は〜をしました。',
    grammarExplain: 'Hôm qua tôi đã làm ~.',
    passage: '昨日はログイン機能の実装をしました。　今日はAPIのテストをする予定です。　認証の部分で詰まっています。　コードレビューは完了しました。',
    vocab: [
      { ja: '進捗', kana: 'しんちょく', vi: 'Tiến độ' },
      { ja: '完了', kana: 'かんりょう', vi: 'Hoàn thành' },
      { ja: '作業', kana: 'さぎょう', vi: 'Công việc, tác vụ' },
      { ja: '予定', kana: 'よてい', vi: 'Kế hoạch, dự định' },
      { ja: '問題', kana: 'もんだい', vi: 'Vấn đề' },
      { ja: 'ブロッカー', kana: '', vi: 'Blocker (trở ngại)' },
    ],
  },
  {
    day: 3,
    titleVi: 'Từ vựng lập trình cơ bản',
    grammarPoint: '〜とはどういう意味ですか？',
    grammarExplain: '~ có nghĩa là gì?',
    passage: '「戻り値」とはどういう意味ですか？　この関数はどこで定義されていますか？　この値を関数に渡してください。　この変数の型は何ですか？',
    vocab: [
      { ja: '変数', kana: 'へんすう', vi: 'Biến' },
      { ja: '関数', kana: 'かんすう', vi: 'Hàm' },
      { ja: '型', kana: 'かた', vi: 'Kiểu (dữ liệu)' },
      { ja: '値', kana: 'あたい', vi: 'Giá trị' },
      { ja: '引数', kana: 'ひきすう', vi: 'Tham số / đối số' },
      { ja: '戻り値', kana: 'もどりち', vi: 'Giá trị trả về' },
      { ja: 'クラス', kana: '', vi: 'Lớp (class)' },
      { ja: 'オブジェクト', kana: '', vi: 'Đối tượng (object)' },
    ],
  },
  {
    day: 4,
    titleVi: 'Báo cáo & Tái hiện bug',
    grammarPoint: '〜に不具合が発生しました。',
    grammarExplain: 'Đã xảy ra sự cố ở ~.',
    passage: 'ログイン機能に不具合が発生しました。　メモリリークが原因でクラッシュが起きています。　この不具合の再現手順を教えていただけますか？　このバグは修正済みです。',
    vocab: [
      { ja: 'バグ', kana: '', vi: 'Lỗi (bug)' },
      { ja: '不具合', kana: 'ふぐあい', vi: 'Sự cố, trục trặc' },
      { ja: '再現', kana: 'さいげん', vi: 'Tái hiện (lỗi)' },
      { ja: '原因', kana: 'げんいん', vi: 'Nguyên nhân' },
      { ja: 'ログ', kana: '', vi: 'Log (nhật ký hệ thống)' },
      { ja: 'エラーメッセージ', kana: '', vi: 'Thông báo lỗi' },
      { ja: '修正', kana: 'しゅうせい', vi: 'Sửa lỗi' },
      { ja: '確認', kana: 'かくにん', vi: 'Xác nhận, kiểm tra' },
    ],
  },
  {
    day: 5,
    titleVi: 'Review code',
    grammarPoint: '〜のレビューをお願いできますか？',
    grammarExplain: 'Bạn có thể review ~ cho tôi không?',
    passage: 'このプルリクエストのレビューをお願いできますか？　ここは変数名をもっとわかりやすく修正した方がいいと思います。　LGTMです。マージしても大丈夫です。',
    vocab: [
      { ja: 'コードレビュー', kana: '', vi: 'Review code' },
      { ja: 'プルリクエスト', kana: '', vi: 'Pull Request (PR)' },
      { ja: 'リファクタリング', kana: '', vi: 'Refactoring' },
      { ja: 'テスト', kana: '', vi: 'Test' },
      { ja: '可読性', kana: 'かどくせい', vi: 'Tính dễ đọc (readability)' },
      { ja: '実装', kana: 'じっそう', vi: 'Triển khai, hiện thực' },
    ],
  },
  {
    day: 6,
    titleVi: 'Họp kỹ thuật & Thảo luận',
    grammarPoint: '〜についてご相談したいのですが。',
    grammarExplain: 'Tôi muốn trao đổi về ~. (mở đầu lịch sự)',
    passage: 'アーキテクチャの設計についてご相談したいのですが。　マイクロサービスを採用するのはいかがでしょうか？　この設計方針についてご意見をお聞かせください。',
    vocab: [
      { ja: '要求', kana: 'ようきゅう', vi: 'Yêu cầu' },
      { ja: '仕様', kana: 'しよう', vi: 'Đặc tả, thông số kỹ thuật' },
      { ja: '機能', kana: 'きのう', vi: 'Tính năng, chức năng' },
      { ja: '課題', kana: 'かだい', vi: 'Vấn đề cần giải quyết' },
      { ja: '提案', kana: 'ていあん', vi: 'Đề xuất' },
      { ja: '検討', kana: 'けんとう', vi: 'Cân nhắc, xem xét' },
    ],
  },
  {
    day: 7,
    titleVi: 'Triển khai & Vận hành',
    grammarPoint: '〜を本番環境にデプロイしました。',
    grammarExplain: 'Đã deploy ~ lên môi trường production.',
    passage: 'v2.1.0を本番環境にデプロイしました。　本番サーバに障害が発生しています。確認中です。　問題が解決するまでロールバックを実施します。',
    vocab: [
      { ja: '本番', kana: 'ほんばん', vi: 'Production (môi trường thật)' },
      { ja: '環境', kana: 'かんきょう', vi: 'Môi trường' },
      { ja: 'デプロイ', kana: '', vi: 'Triển khai (deploy)' },
      { ja: 'リリース', kana: '', vi: 'Phát hành (release)' },
      { ja: '監視', kana: 'かんし', vi: 'Giám sát' },
      { ja: '障害', kana: 'しょうがい', vi: 'Sự cố hệ thống (outage)' },
      { ja: 'ロールバック', kana: '', vi: 'Rollback (quay về bản cũ)' },
    ],
  },
  {
    day: 8,
    titleVi: 'Bảo mật & Quyền hạn',
    grammarPoint: '〜に脆弱性が見つかりました。',
    grammarExplain: 'Đã phát hiện lỗ hổng bảo mật ở ~.',
    passage: '認証システムに脆弱性が見つかりました。早急に対応が必要です。　このAPIにアクセスするには管理者権限が必要です。　SQLインジェクションへの対策を実装しました。',
    vocab: [
      { ja: '脆弱性', kana: 'ぜいじゃくせい', vi: 'Lỗ hổng bảo mật' },
      { ja: '認証', kana: 'にんしょう', vi: 'Xác thực' },
      { ja: '暗号化', kana: 'あんごうか', vi: 'Mã hóa' },
      { ja: '権限', kana: 'けんげん', vi: 'Quyền hạn' },
      { ja: '対策', kana: 'たいさく', vi: 'Biện pháp đối phó' },
      { ja: '不正アクセス', kana: 'ふせいアクセス', vi: 'Truy cập trái phép' },
    ],
  },
  {
    day: 9,
    titleVi: 'Hỏi & Xin giúp đỡ',
    grammarPoint: '〜について教えていただけますか？',
    grammarExplain: 'Bạn có thể chỉ cho tôi về ~ không? (lịch sự)',
    passage: 'このAPIの使い方について教えていただけますか？　技術的な質問があるのですが、少々お時間をいただけますか？　この実装の確認をお願いしてもいいですか？',
    vocab: [
      { ja: '質問', kana: 'しつもん', vi: 'Câu hỏi' },
      { ja: '説明', kana: 'せつめい', vi: 'Giải thích' },
      { ja: '確認', kana: 'かくにん', vi: 'Xác nhận, kiểm tra' },
      { ja: '参考', kana: 'さんこう', vi: 'Tài liệu tham khảo' },
      { ja: '手伝い', kana: 'てつだい', vi: 'Sự giúp đỡ' },
      { ja: 'ドキュメント', kana: '', vi: 'Tài liệu (document)' },
    ],
  },
  {
    day: 10,
    titleVi: 'Deadline & Ước lượng thời gian',
    grammarPoint: '〜の締め切りはいつですか？',
    grammarExplain: 'Deadline của ~ là khi nào?',
    passage: 'このタスクの締め切りはいつですか？　この機能の実装は3日ほどかかる見込みです。　依存ライブラリの問題で、リリースが遅延する可能性があります。',
    vocab: [
      { ja: '締め切り', kana: 'しめきり', vi: 'Deadline' },
      { ja: '工数', kana: 'こうすう', vi: 'Man-hour, số giờ công' },
      { ja: '見積もり', kana: 'みつもり', vi: 'Ước lượng, báo giá' },
      { ja: '優先度', kana: 'ゆうせんど', vi: 'Độ ưu tiên' },
      { ja: '遅延', kana: 'ちえん', vi: 'Trì hoãn, chậm tiến độ' },
      { ja: '対応', kana: 'たいおう', vi: 'Xử lý, giải quyết' },
      { ja: 'スプリント', kana: '', vi: 'Sprint' },
    ],
  },
  {
    day: 11,
    titleVi: 'Hỗ trợ kỹ thuật & Troubleshoot',
    grammarPoint: 'どのようなエラーが出ていますか？',
    grammarExplain: 'Bạn đang gặp lỗi gì?',
    passage: 'アプリが起動しないとのことですが、どのようなエラーが出ていますか？　一度キャッシュをクリアしてみてください。　環境変数の設定を確認していただけますか？',
    vocab: [
      { ja: '設定', kana: 'せってい', vi: 'Cài đặt, cấu hình' },
      { ja: '接続', kana: 'せつぞく', vi: 'Kết nối' },
      { ja: '再起動', kana: 'さいきどう', vi: 'Khởi động lại' },
      { ja: 'タイムアウト', kana: '', vi: 'Timeout' },
      { ja: 'キャッシュ', kana: '', vi: 'Cache' },
      { ja: 'クリア', kana: '', vi: 'Xóa sạch, clear' },
    ],
  },
  {
    day: 12,
    titleVi: 'Kiến trúc & Thiết kế hệ thống',
    grammarPoint: '〜を採用することを提案します。',
    grammarExplain: 'Tôi đề xuất áp dụng ~.',
    passage: 'キャッシュ層を採用することを提案します。　パフォーマンスとコストのトレードオフを考慮する必要があります。　データベースへのアクセスがボトルネックになっています。',
    vocab: [
      { ja: 'アーキテクチャ', kana: '', vi: 'Kiến trúc (architecture)' },
      { ja: 'スケーラビリティ', kana: '', vi: 'Khả năng mở rộng (scalability)' },
      { ja: '可用性', kana: 'かようせい', vi: 'Tính khả dụng (availability)' },
      { ja: 'マイクロサービス', kana: '', vi: 'Microservices' },
      { ja: 'データベース', kana: '', vi: 'Cơ sở dữ liệu' },
      { ja: 'キャッシュ', kana: '', vi: 'Cache' },
    ],
  },
  {
    day: 13,
    titleVi: 'Giao tiếp kinh doanh',
    grammarPoint: 'お世話になっております。',
    grammarExplain: 'Cảm ơn vì sự hỗ trợ thường ngày. (mở đầu email chuẩn Nhật)',
    passage: 'お世話になっております。弊社の〇〇と申します。　添付の仕様書についてご確認いただけますでしょうか？　何かご不明な点がございましたらお知らせください。',
    vocab: [
      { ja: '弊社', kana: 'へいしゃ', vi: 'Công ty chúng tôi (khiêm tốn)' },
      { ja: '御社', kana: 'おんしゃ', vi: 'Công ty của quý vị (kính trọng)' },
      { ja: '担当者', kana: 'たんとうしゃ', vi: 'Người phụ trách' },
      { ja: '納期', kana: 'のうき', vi: 'Hạn giao hàng / bàn giao' },
      { ja: '契約', kana: 'けいやく', vi: 'Hợp đồng' },
      { ja: '報告', kana: 'ほうこく', vi: 'Báo cáo' },
    ],
  },
  {
    day: 14,
    titleVi: 'Thuyết trình kỹ thuật',
    grammarPoint: '本日は〜についてご説明します。',
    grammarExplain: 'Hôm nay tôi sẽ trình bày về ~.',
    passage: '本日は新しいアーキテクチャの提案についてご説明します。　現在、レスポンスが遅いという課題があります。　以上で説明を終わります。ご質問はございますか？',
    vocab: [
      { ja: '発表', kana: 'はっぴょう', vi: 'Thuyết trình, trình bày' },
      { ja: 'スライド', kana: '', vi: 'Slide' },
      { ja: '資料', kana: 'しりょう', vi: 'Tài liệu, materials' },
      { ja: 'デモ', kana: '', vi: 'Demo' },
      { ja: '質疑応答', kana: 'しつぎおうとう', vi: 'Hỏi đáp (Q&A)' },
      { ja: '解決策', kana: 'かいけつさく', vi: 'Giải pháp' },
    ],
  },
];

async function seed() {
  console.log('🌱 Bắt đầu seed...');

  for (const day of seedData) {
    // 1. Insert words
    const insertedWords = await db
      .insert(word)
      .values(
        day.vocab.map((v) => ({
          kanji:    v.ja,
          hiragana: v.kana || v.ja,
          meaning:  v.vi,
        })),
      )
      .returning();

    // 2. Insert lesson
    const [insertedLesson] = await db
      .insert(lesson)
      .values({
        title:          `Ngày ${day.day} - ${day.titleVi}`,
        passage:        day.passage,
        grammarPoint:   day.grammarPoint,
        grammarExplain: day.grammarExplain,
        orderIndex:     day.day,
      })
      .returning();

    // 3. Link words to lesson
    await db.insert(lessonWord).values(
      insertedWords.map((w, i) => ({
        lessonId:   insertedLesson.id,
        wordId:     w.id,
        orderIndex: i + 1,
      })),
    );

    console.log(`✅ Ngày ${day.day}: ${day.titleVi} — ${insertedWords.length} từ`);
  }

  console.log('✅ Seed hoàn tất!');
  await client.end();
}

seed().catch((e) => {
  console.error('❌ Seed thất bại:', e);
  process.exit(1);
});
