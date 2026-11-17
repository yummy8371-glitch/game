import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Trophy, Play, RotateCcw, Delete, Sparkles, Utensils } from 'lucide-react';
import './App.css';

interface FoodItem {
  label: string;
  kana: string;
}

// 食事できる食品100種類
const FOOD_LIST: FoodItem[] = [
  { label: 'チーズカレー', kana: 'ちーずかれー' },
  { label: '牛丼', kana: 'ぎゅうどん' },
  { label: 'カルボナーラ', kana: 'かるぼなーら' },
  { label: 'トマトシチュー', kana: 'とまとしちゅー' },
  { label: '生姜焼き肉定食', kana: 'しょうがやきにくていしょく' },
  { label: 'オムライス', kana: 'おむらいす' },
  { label: '味噌ラーメン', kana: 'みそらーめん' },
  { label: '親子丼', kana: 'おやこどん' },
  { label: 'カツ丼', kana: 'かつどん' },
  { label: '天ぷらうどん', kana: 'てんぷらうどん' },
  { label: 'きつねそば', kana: 'きつねそば' },
  { label: 'ハンバーグ定食', kana: 'はんばーぐていしょく' },
  { label: 'エビフライ', kana: 'えびふらい' },
  { label: '唐揚げ弁当', kana: 'からあげべんとう' },
  { label: '豚汁定食', kana: 'とんじるていしょく' },
  { label: '焼き餃子', kana: 'やきぎょうざ' },
  { label: 'チャーハン', kana: 'ちゃーはん' },
  { label: '麻婆豆腐', kana: 'まーぼーどうふ' },
  { label: 'エビチリ', kana: 'えびちり' },
  { label: '天津飯', kana: 'てんしんはん' },
  { label: '冷やし中華', kana: 'ひやしちゅうか' },
  { label: '担々麺', kana: 'たんたんめん' },
  { label: '醤油ラーメン', kana: 'しょうゆらーめん' },
  { label: '豚骨ラーメン', kana: 'とんこつらーめん' },
  { label: '塩ラーメン', kana: 'しおらーめん' },
  { label: 'つけ麺', kana: 'つけめん' },
  { label: '焼きそば', kana: 'やきそば' },
  { label: 'お好み焼き', kana: 'おこのみやき' },
  { label: 'たこ焼き', kana: 'たこやき' },
  { label: 'もんじゃ焼き', kana: 'もんじゃやき' },
  { label: '明石焼き', kana: 'あかしやき' },
  { label: '握り寿司', kana: 'にぎりずし' },
  { label: '海鮮丼', kana: 'かいせんどん' },
  { label: '鉄火丼', kana: 'てっかどん' },
  { label: 'うな重', kana: 'うなじゅう' },
  { label: 'ちらし寿司', kana: 'ちらしずし' },
  { label: 'いなり寿司', kana: 'いなりずし' },
  { label: '納豆巻き', kana: 'なっとうまき' },
  { label: 'かっぱ巻き', kana: 'かっぱまき' },
  { label: '茶碗蒸し', kana: 'ちゃわんむし' },
  { label: 'すき焼き', kana: 'すきやき' },
  { label: 'しゃぶしゃぶ', kana: 'しゃぶしゃぶ' },
  { label: 'もつ鍋', kana: 'もつなべ' },
  { label: 'キムチ鍋', kana: 'きむちなべ' },
  { label: '水炊き', kana: 'みずたき' },
  { label: 'おでん', kana: 'おでん' },
  { label: '肉じゃが', kana: 'にくじゃが' },
  { label: 'サバの味噌煮', kana: 'さばのみそに' },
  { label: 'アジフライ', kana: 'あじふらい' },
  { label: 'カキフライ', kana: 'かきふらい' },
  { label: 'コロッケパン', kana: 'ころっけぱん' },
  { label: 'カレーパン', kana: 'かれーぱん' },
  { label: 'メロンパン', kana: 'めろんぱん' },
  { label: 'あんぱん', kana: 'あんぱん' },
  { label: 'クリームパン', kana: 'くりーむぱん' },
  { label: 'クロワッサン', kana: 'くろわっさん' },
  { label: 'フレンチトースト', kana: 'ふれんとーすと' },
  { label: 'ホットケーキ', kana: 'ほっとけーき' },
  { label: 'パンケーキ', kana: 'ぱんけーき' },
  { label: 'サンドイッチ', kana: 'さんどいっち' },
  { label: 'ハンバーガー', kana: 'はんばーがー' },
  { label: 'チーズバーガー', kana: 'ちーずばーがー' },
  { label: 'ホットドッグ', kana: 'ほっとどっぐ' },
  { label: 'フライドポテト', kana: 'ふらいどぽてと' },
  { label: 'フライドチキン', kana: 'ふらいどちきん' },
  { label: 'ナポリタン', kana: 'なぽりたん' },
  { label: 'ペペロンチーノ', kana: 'ぺぺろんちーの' },
  { label: 'ミートソース', kana: 'みーとそーす' },
  { label: 'たらこスパゲティ', kana: 'たらこすぱげてぃ' },
  { label: 'マルゲリータ', kana: 'まるげりーた' },
  { label: 'シーフードピザ', kana: 'しーふーどぴざ' },
  { label: 'グラタン', kana: 'ぐらたん' },
  { label: 'ドリア', kana: 'どりあ' },
  { label: 'ビーフシチュー', kana: 'びーふしちゅー' },
  { label: 'クリームシチュー', kana: 'くりーむしちゅー' },
  { label: 'ハヤシライス', kana: 'はやしらいす' },
  { label: 'カツカレー', kana: 'かつかれー' },
  { label: 'ドライカレー', kana: 'どらいかれー' },
  { label: 'グリーンカレー', kana: 'ぐりーんかれー' },
  { label: 'タコライス', kana: 'たこらいす' },
  { label: 'ロコモコ丼', kana: 'ろこもこどん' },
  { label: 'ガパオライス', kana: 'がぱおらいす' },
  { label: 'パエリア', kana: 'ぱえりあ' },
  { label: 'ビビンバ', kana: 'びびんば' },
  { label: '冷麺', kana: 'れいめん' },
  { label: 'サムゲタン', kana: 'さむげたん' },
  { label: 'チヂミ', kana: 'ちぢみ' },
  { label: '小籠包', kana: 'しょうろんぽう' },
  { label: '焼売', kana: 'しゅうまい' },
  { label: '春巻き', kana: 'はるまき' },
  { label: '肉まん', kana: 'にくまん' },
  { label: 'あんまん', kana: 'あんまん' },
  { label: 'ピザまん', kana: 'ぴざまん' },
  { label: 'カレーまん', kana: 'かれーまん' },
  { label: 'いちごショート', kana: 'いちごしょーと' },
  { label: 'チーズケーキ', kana: 'ちーずけーき' },
  { label: 'モンブラン', kana: 'もんぶらん' },
  { label: 'シュークリーム', kana: 'しゅーくりーむ' },
  { label: 'プリンアラモード', kana: 'ぷりんあらもーど' },
  { label: '抹茶パフェ', kana: 'まっちゃぱふぇ' }
];

type Direction = 'center' | 'left' | 'up' | 'right' | 'down';

interface KeyDef {
  id: string;
  chars: [string, string, string, string, string]; // [中央, 左, 上, 右, 下]
  subLabel: string;
}

const FLICK_KEYS: KeyDef[] = [
  { id: 'a', chars: ['あ', 'い', 'う', 'え', 'お'], subLabel: 'いうえお' },
  { id: 'ka', chars: ['か', 'き', 'く', 'け', 'こ'], subLabel: 'きくけこ' },
  { id: 'sa', chars: ['さ', 'し', 'す', 'せ', 'そ'], subLabel: 'しすせそ' },
  { id: 'ta', chars: ['た', 'ち', 'つ', 'て', 'と'], subLabel: 'ちつてと' },
  { id: 'na', chars: ['な', 'に', 'ぬ', 'ね', 'の'], subLabel: 'にぬねの' },
  { id: 'ha', chars: ['は', 'ひ', 'ふ', 'へ', 'ほ'], subLabel: 'ひふへほ' },
  { id: 'ma', chars: ['ま', 'み', 'む', 'め', 'も'], subLabel: 'みむめも' },
  { id: 'ya', chars: ['や', '「', 'ゆ', '」', 'よ'], subLabel: 'ゆ よ' },
  { id: 'ra', chars: ['ら', 'り', 'る', 'れ', 'ろ'], subLabel: 'りるれろ' },
  { id: 'wa', chars: ['わ', 'を', 'ん', 'ー', '！'], subLabel: 'をんー' }
];

// 濁点・半濁点・小文字サイクル変換マップ
const MODIFIER_MAP: Record<string, string> = {
  // か行
  'か': 'が', 'が': 'か',
  'き': 'ぎ', 'ぎ': 'き',
  'く': 'ぐ', 'ぐ': 'く',
  'け': 'げ', 'げ': 'け',
  'こ': 'ご', 'ご': 'こ',
  // さ行
  'さ': 'ざ', 'ざ': 'さ',
  'し': 'じ', 'じ': 'し',
  'す': 'ず', 'ず': 'す',
  'せ': 'ぜ', 'ぜ': 'せ',
  'そ': 'ぞ', 'ぞ': 'そ',
  // た行
  'た': 'だ', 'だ': 'た',
  'ち': 'ぢ', 'ぢ': 'ち',
  'つ': 'っ', 'っ': 'づ', 'づ': 'つ',
  'て': 'で', 'で': 'て',
  'と': 'ど', 'ど': 'と',
  // は行（清音 -> 濁点 -> 半濁点 -> 清音）
  'は': 'ば', 'ば': 'ぱ', 'ぱ': 'は',
  'ひ': 'び', 'び': 'ぴ', 'ぴ': 'ひ',
  'ふ': 'ぶ', 'ぶ': 'ぷ', 'ぷ': 'ふ',
  'へ': 'べ', 'べ': 'ぺ', 'ぺ': 'へ',
  'ほ': 'ぼ', 'ぼ': 'ぽ', 'ぽ': 'ほ',
  // あ行・や行・わ行の小文字
  'あ': 'ぁ', 'ぁ': 'あ',
  'い': 'ぃ', 'ぃ': 'い',
  'う': 'ぅ', 'ぅ': 'ゔ', 'ゔ': 'う',
  'え': 'ぇ', 'ぇ': 'え',
  'お': 'ぉ', 'ぉ': 'お',
  'や': 'ゃ', 'ゃ': 'や',
  'ゆ': 'ゅ', 'ゅ': 'ゆ',
  'よ': 'ょ', 'ょ': 'よ',
  'わ': 'ゎ', 'ゎ': 'わ'
};

const DIR_INDEX: Record<Direction, number> = {
  center: 0,
  left: 1,
  up: 2,
  right: 3,
  down: 4
};

export function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'result'>('start');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [currentFood, setCurrentFood] = useState<FoodItem>(FOOD_LIST[0]);
  const [typedKana, setTypedKana] = useState<string>('');
  const [scorePopupKey, setScorePopupKey] = useState<number>(0);

  // フリック操作状態
  const [activeKey, setActiveKey] = useState<KeyDef | null>(null);
  const [flickDir, setFlickDir] = useState<Direction>('center');
  const [guidePos, setGuidePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const pickRandomFood = useCallback((excludeLabel?: string) => {
    const candidates = FOOD_LIST.filter((f) => f.label !== excludeLabel);
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    return next;
  }, []);

  const startGame = () => {
    setScore(0);
    setCompletedCount(0);
    setCombo(0);
    setTimeLeft(60);
    setTypedKana('');
    setCurrentFood(pickRandomFood());
    setGameState('playing');
  };

  // 60秒タイマー
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('result');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  // 文字確定処理
  const commitChar = useCallback(
    (char: string) => {
      if (gameState !== 'playing') return;

      setTypedKana((prev) => {
        const nextTyped = prev + char;
        // 正解フレーズと先頭一致しているか判定
        if (currentFood.kana.startsWith(nextTyped)) {
          // 1フレーズ完成！
          if (nextTyped === currentFood.kana) {
            setScore((s) => s + 10);
            setCompletedCount((c) => c + 1);
            setCombo((cb) => cb + 1);
            setScorePopupKey((k) => k + 1);
            setCurrentFood((curr) => pickRandomFood(curr.label));
            return '';
          }
          return nextTyped;
        } else {
          // ミス入力時は現在のフレーズの最初または直前までに留める（連続入力しやすいよう直前文字を維持）
          setCombo(0);
          return prev;
        }
      });
    },
    [gameState, currentFood, pickRandomFood]
  );

  // 濁点・半濁点・小文字変換処理
  const handleModifier = useCallback(() => {
    if (gameState !== 'playing') return;
    setTypedKana((prev) => {
      if (prev.length === 0) return prev;
      const lastChar = prev.slice(-1);
      const converted = MODIFIER_MAP[lastChar];
      if (!converted) return prev;

      const candidate = prev.slice(0, -1) + converted;
      if (currentFood.kana.startsWith(candidate)) {
        if (candidate === currentFood.kana) {
          setScore((s) => s + 10);
          setCompletedCount((c) => c + 1);
          setCombo((cb) => cb + 1);
          setScorePopupKey((k) => k + 1);
          setCurrentFood((curr) => pickRandomFood(curr.label));
          return '';
        }
        return candidate;
      }
      return candidate;
    });
  }, [gameState, currentFood, pickRandomFood]);

  // 1文字削除
  const handleBackspace = useCallback(() => {
    if (gameState !== 'playing') return;
    setTypedKana((prev) => prev.slice(0, -1));
  }, [gameState]);

  // PCキーボードからの直接ひらがな入力もサポート
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key.length === 1 && /[ぁ-んー]/.test(e.key)) {
        commitChar(e.key);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameState, commitChar, handleBackspace]);

  // ポインター（タッチ・マウス共通）フリック開始
  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>, keyDef: KeyDef) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    touchStartRef.current = { x: e.clientX, y: e.clientY };
    setActiveKey(keyDef);
    setFlickDir('center');

    if (cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const btnRect = e.currentTarget.getBoundingClientRect();
      setGuidePos({
        x: btnRect.left - cardRect.left + btnRect.width / 2,
        y: btnRect.top - cardRect.top + btnRect.height / 2
      });
    }
  };

  // ポインター移動中の方向判定
  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!activeKey || !touchStartRef.current) return;
    const dx = e.clientX - touchStartRef.current.x;
    const dy = e.clientY - touchStartRef.current.y;
    const threshold = 22;

    if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
      setFlickDir('center');
    } else if (Math.abs(dx) > Math.abs(dy)) {
      setFlickDir(dx < 0 ? 'left' : 'right');
    } else {
      setFlickDir(dy < 0 ? 'up' : 'down');
    }
  };

  // ポインター離した時に文字確定
  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!activeKey) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const selectedChar = activeKey.chars[DIR_INDEX[flickDir]];
    commitChar(selectedChar);
    setActiveKey(null);
    setFlickDir('center');
    touchStartRef.current = null;
  };

  const remainingKana = currentFood.kana.slice(typedKana.length);
  const currentTargetChar = remainingKana.charAt(0);
  const afterTargetKana = remainingKana.slice(1);

  return (
    <div className="app-container">
      <div className="game-card" ref={cardRef}>
        {/* スタート画面 */}
        {gameState === 'start' && (
          <div className="overlay-screen">
            <div className="title-badge">
              <Utensils size={14} style={{ display: 'inline', marginRight: 6 }} />
              グルメフリックチャレンジ
            </div>
            <h1 className="main-title">
              食べものフリック
              <br />
              60秒タイムアタック！
            </h1>
            <div className="rule-box">
              <div>・制限時間は <strong>60秒</strong>！</div>
              <div>・美味しい食品がランダムで <strong>100種類</strong> 出題！</div>
              <div>・1フレーズ完成ごとに <strong>+10点</strong> 加点！</div>
              <div>・iPhone / Android のフリック入力に完全対応！</div>
            </div>
            <button className="primary-btn" onClick={startGame}>
              <Play size={22} fill="currentColor" />
              ゲームスタート
            </button>
          </div>
        )}

        {/* プレイ画面 */}
        {gameState === 'playing' && (
          <>
            <div className="game-header">
              <div className="stat-box">
                <span className="stat-label">
                  <Timer size={14} /> のこり時間
                </span>
                <span className={`stat-value ${timeLeft <= 10 ? 'urgent' : ''}`}>
                  {timeLeft}秒
                </span>
              </div>
              <div className="stat-box">
                <span className="stat-label">
                  <Trophy size={14} /> スコア
                </span>
                <span className="stat-value">{score}点</span>
              </div>
            </div>

            <div className="prompt-area">
              {scorePopupKey > 0 && (
                <div key={scorePopupKey} className="score-popup">
                  +10点！
                </div>
              )}
              {combo > 1 && <div className="combo-badge">{combo} 連続！</div>}
              <div className="food-kanji">{currentFood.label}</div>
              <div className="kana-progress">
                <span className="kana-done">{typedKana}</span>
                {currentTargetChar && (
                  <span className="kana-current">{currentTargetChar}</span>
                )}
                <span className="kana-remain">{afterTargetKana}</span>
              </div>
            </div>

            {/* フリック中の十字ガイド表示 */}
            {activeKey && (
              <div
                className="flick-guide-popup"
                style={{ left: `${guidePos.x}px`, top: `${guidePos.y}px` }}
              >
                <div className={`guide-cell guide-center ${flickDir === 'center' ? 'selected' : ''}`}>
                  {activeKey.chars[0]}
                </div>
                <div className={`guide-cell guide-left ${flickDir === 'left' ? 'selected' : ''}`}>
                  {activeKey.chars[1]}
                </div>
                <div className={`guide-cell guide-up ${flickDir === 'up' ? 'selected' : ''}`}>
                  {activeKey.chars[2]}
                </div>
                <div className={`guide-cell guide-right ${flickDir === 'right' ? 'selected' : ''}`}>
                  {activeKey.chars[3]}
                </div>
                <div className={`guide-cell guide-down ${flickDir === 'down' ? 'selected' : ''}`}>
                  {activeKey.chars[4]}
                </div>
              </div>
            )}

            {/* 4列×3行の日本語テンキー配列 */}
            <div className="flick-keyboard">
              {/* 1行目: あ・か・さ・削除 */}
              {FLICK_KEYS.slice(0, 3).map((k) => (
                <button
                  key={k.id}
                  type="button"
                  className={`flick-key ${activeKey?.id === k.id ? 'active' : ''}`}
                  onPointerDown={(e) => handlePointerDown(e, k)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <span className="key-main-char">{k.chars[0]}</span>
                  <span className="key-sub-chars">{k.subLabel}</span>
                </button>
              ))}
              <button
                type="button"
                className="flick-key func-key"
                onClick={handleBackspace}
              >
                <Delete size={20} />
                <span style={{ fontSize: '0.68rem', marginTop: 2 }}>1文字消す</span>
              </button>

              {/* 2行目: た・な・は・スキップ */}
              {FLICK_KEYS.slice(3, 6).map((k) => (
                <button
                  key={k.id}
                  type="button"
                  className={`flick-key ${activeKey?.id === k.id ? 'active' : ''}`}
                  onPointerDown={(e) => handlePointerDown(e, k)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <span className="key-main-char">{k.chars[0]}</span>
                  <span className="key-sub-chars">{k.subLabel}</span>
                </button>
              ))}
              <button
                type="button"
                className="flick-key func-key"
                onClick={() => {
                  setCombo(0);
                  setTypedKana('');
                  setCurrentFood((curr) => pickRandomFood(curr.label));
                }}
              >
                <span>パス</span>
                <span style={{ fontSize: '0.65rem', marginTop: 2 }}>次のお題へ</span>
              </button>

              {/* 3行目: ま・や・ら・濁点小文字 */}
              {FLICK_KEYS.slice(6, 9).map((k) => (
                <button
                  key={k.id}
                  type="button"
                  className={`flick-key ${activeKey?.id === k.id ? 'active' : ''}`}
                  onPointerDown={(e) => handlePointerDown(e, k)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  <span className="key-main-char">{k.chars[0]}</span>
                  <span className="key-sub-chars">{k.subLabel}</span>
                </button>
              ))}
              <button
                type="button"
                className="flick-key func-key"
                onClick={handleModifier}
              >
                <span style={{ fontSize: '1.1rem' }}>゛゜小</span>
                <span style={{ fontSize: '0.65rem', marginTop: 2 }}>変換</span>
              </button>

              {/* 4行目: ダミー・わ・伸ばし棒専用ショートカット */}
              <div className="flick-key func-key" style={{ opacity: 0.45, pointerEvents: 'none' }}>
                <span>ABC</span>
              </div>
              <button
                type="button"
                className={`flick-key ${activeKey?.id === 'wa' ? 'active' : ''}`}
                onPointerDown={(e) => handlePointerDown(e, FLICK_KEYS[9])}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                <span className="key-main-char">{FLICK_KEYS[9].chars[0]}</span>
                <span className="key-sub-chars">{FLICK_KEYS[9].subLabel}</span>
              </button>
              <button
                type="button"
                className="flick-key func-key"
                onClick={() => commitChar('ー')}
              >
                <span style={{ fontSize: '1.3rem' }}>ー</span>
                <span style={{ fontSize: '0.65rem' }}>伸ばす</span>
              </button>
              <button
                type="button"
                className="flick-key func-key"
                onClick={() => commitChar('ん')}
              >
                <span style={{ fontSize: '1.2rem' }}>ん</span>
                <span style={{ fontSize: '0.65rem' }}>ワンタップ</span>
              </button>
            </div>
          </>
        )}

        {/* リザルト画面 */}
        {gameState === 'result' && (
          <div className="overlay-screen">
            <div className="title-badge">
              <Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} />
              タイムアップ！
            </div>
            <h2 className="main-title">結果発表</h2>
            <div>
              <div className="result-score">{score} 点</div>
              <div className="result-sub">完食したメニュー数：{completedCount} 品</div>
            </div>
            <button className="primary-btn" onClick={startGame}>
              <RotateCcw size={20} />
              もう一度プレイ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;