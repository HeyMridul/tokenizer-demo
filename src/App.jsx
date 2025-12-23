import React, { useState } from 'react';
import { Sparkles, ArrowRight, Info, Zap, Brain, BookOpen } from 'lucide-react';

export default function TokenizerDemo() {
  const [inputText, setInputText] = useState('');
  const [tokenMode, setTokenMode] = useState('character');
  const [valueMode, setValueMode] = useState('numeric');
  const [tokens, setTokens] = useState([]);
  const [encodedValues, setEncodedValues] = useState([]);
  const [decodedText, setDecodedText] = useState('');
  const [aiInsight, setAiInsight] = useState('');
  const [activeTab, setActiveTab] = useState('encode');
  const [encodedInput, setEncodedInput] = useState('');

  // Emoji mappings for visual mode
  const emojiMap = {
    'a': { emoji: '🍎', name: 'Apple' },
    'b': { emoji: '🍌', name: 'Banana' },
    'c': { emoji: '🥕', name: 'Carrot' },
    'd': { emoji: '🍩', name: 'Donut' },
    'e': { emoji: '🥚', name: 'Egg' },
    'f': { emoji: '🍟', name: 'Fries' },
    'g': { emoji: '🍇', name: 'Grapes' },
    'h': { emoji: '🍯', name: 'Honey' },
    'i': { emoji: '🍦', name: 'Ice Cream' },
    'j': { emoji: '🥤', name: 'Juice' },
    'k': { emoji: '🥝', name: 'Kiwi' },
    'l': { emoji: '🍋', name: 'Lemon' },
    'm': { emoji: '🍄', name: 'Mushroom' },
    'n': { emoji: '🥜', name: 'Nuts' },
    'o': { emoji: '🍊', name: 'Orange' },
    'p': { emoji: '🍕', name: 'Pizza' },
    'q': { emoji: '🧀', name: 'Cheese' },
    'r': { emoji: '🍓', name: 'Strawberry' },
    's': { emoji: '🥗', name: 'Salad' },
    't': { emoji: '🍅', name: 'Tomato' },
    'u': { emoji: '☂️', name: 'Umbrella' },
    'v': { emoji: '🎻', name: 'Violin' },
    'w': { emoji: '🍉', name: 'Watermelon' },
    'x': { emoji: '❌', name: 'X-mark' },
    'y': { emoji: '💛', name: 'Yellow Heart' },
    'z': { emoji: '🦓', name: 'Zebra' },
    ' ': { emoji: '⬜', name: 'Space' },
    '.': { emoji: '⚫', name: 'Period' },
    ',': { emoji: '🔵', name: 'Comma' },
    '!': { emoji: '❗', name: 'Exclamation' },
    '?': { emoji: '❓', name: 'Question' }
  };

  const tokenize = (text) => {
    if (tokenMode === 'character') {
      return text.split('');
    } else if (tokenMode === 'word') {
      return text.match(/\S+|\s+/g) || [];
    } else {
      return text.match(/\w+|[^\w\s]|\s+/g) || [];
    }
  };

  const encode = (tokenList) => {
    return tokenList.map((token, idx) => {
      if (valueMode === 'numeric') {
        if (tokenMode === 'character') {
          return token.charCodeAt(0);
        } else {
          return idx + 1;
        }
      } else {
        const char = token.toLowerCase()[0];
        return emojiMap[char] || { emoji: '❔', name: 'Unknown' };
      }
    });
  };

  const generateAIInsight = (tokenList, encodedVals) => {
    const tokenCount = tokenList.length;
    const uniqueTokens = new Set(tokenList).size;
    const avgTokenLength = tokenList.reduce((acc, t) => acc + t.length, 0) / tokenCount;
    
    let insight = `🤖 AI Analysis:\n\n`;
    insight += `📊 Statistics:\n`;
    insight += `• Total Tokens: ${tokenCount}\n`;
    insight += `• Unique Tokens: ${uniqueTokens}\n`;
    insight += `• Avg Token Length: ${avgTokenLength.toFixed(2)} chars\n`;
    insight += `• Vocabulary Diversity: ${((uniqueTokens/tokenCount)*100).toFixed(1)}%\n\n`;
    
    if (tokenMode === 'character') {
      insight += `💡 Character-level tokenization is used in:\n`;
      insight += `• Character-level LSTMs/RNNs\n`;
      insight += `• Text generation models\n`;
      insight += `• Language models for morphologically rich languages\n`;
    } else if (tokenMode === 'word') {
      insight += `💡 Word-level tokenization is used in:\n`;
      insight += `• Traditional NLP (Bag of Words, TF-IDF)\n`;
      insight += `• Word2Vec, GloVe embeddings\n`;
      insight += `• Sentiment analysis systems\n`;
    } else {
      insight += `💡 Subword tokenization is used in:\n`;
      insight += `• Modern transformers (BERT, GPT)\n`;
      insight += `• Handling out-of-vocabulary words\n`;
      insight += `• Multilingual models\n`;
    }
    
    insight += `\n🎯 In AI models, these tokens become:\n`;
    insight += `1. Embedded into dense vectors (embeddings)\n`;
    insight += `2. Processed through neural network layers\n`;
    insight += `3. Used to predict next tokens or perform tasks`;
    
    return insight;
  };

  const handleEncode = () => {
    if (!inputText.trim()) {
      setAiInsight('⚠️ Please enter some text to tokenize!');
      return;
    }
    
    const tokenList = tokenize(inputText);
    const encoded = encode(tokenList);
    
    setTokens(tokenList);
    setEncodedValues(encoded);
    setDecodedText('');
    setAiInsight(generateAIInsight(tokenList, encoded));
  };

  const handleDecode = () => {
    if (!encodedInput.trim()) {
      setDecodedText('⚠️ Please enter encoded values!');
      return;
    }
    
    try {
      const values = encodedInput.split(',').map(v => v.trim());
      let decoded = '';
      
      if (valueMode === 'numeric') {
        decoded = values.map(v => {
          const num = parseInt(v);
          if (tokenMode === 'character') {
            return String.fromCharCode(num);
          } else {
            return `[Token${num}]`;
          }
        }).join('');
      } else {
        decoded = 'Visual mode decoding from emoji coming soon!';
      }
      
      setDecodedText(decoded);
    } catch (error) {
      setDecodedText('❌ Error decoding. Please check your input format.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-yellow-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
              AI Tokenizer Lab
            </h1>
            <Brain className="w-10 h-10 text-pink-400" />
          </div>
          <p className="text-xl text-blue-200">
            Understand how AI models break down and process text
          </p>
        </div>

        {/* Info Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">What is Tokenization?</h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                Tokenization is the process of breaking down text into smaller units (tokens) that AI models can understand. 
                Each token is then converted into a numerical representation (encoding) that neural networks can process. 
                This is the first crucial step in all NLP tasks - from chatbots to language translation!
              </p>
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Tokenization Mode
            </h3>
            <div className="space-y-2">
              {[
                { value: 'character', label: 'Character Level', desc: 'Each character = 1 token' },
                { value: 'word', label: 'Word Level', desc: 'Each word = 1 token' },
                { value: 'subword', label: 'Subword Level', desc: 'Smart splitting (BPE-style)' }
              ].map(mode => (
                <label key={mode.value} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition">
                  <input
                    type="radio"
                    value={mode.value}
                    checked={tokenMode === mode.value}
                    onChange={(e) => setTokenMode(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div>
                    <div className="font-medium">{mode.label}</div>
                    <div className="text-xs text-gray-300">{mode.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-5 border border-white/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-pink-400" />
              Value Representation
            </h3>
            <div className="space-y-2">
              {[
                { value: 'numeric', label: 'Numeric Encoding', desc: 'ASCII/Index values (65, 66, 67...)' },
                { value: 'visual', label: 'Visual Mapping', desc: 'Emoji representations (🍎, 🍌, 🥕...)' }
              ].map(mode => (
                <label key={mode.value} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition">
                  <input
                    type="radio"
                    value={mode.value}
                    checked={valueMode === mode.value}
                    onChange={(e) => setValueMode(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div>
                    <div className="font-medium">{mode.label}</div>
                    <div className="text-xs text-gray-300">{mode.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('encode')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'encode'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            📝 Text → Tokens (Encode)
          </button>
          <button
            onClick={() => setActiveTab('decode')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'decode'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            🔢 Tokens → Text (Decode)
          </button>
        </div>

        {/* Encode Tab */}
        {activeTab === 'encode' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Step 1: Input Your Text</h3>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type anything... Try 'Hello AI World!' or 'Machine Learning is amazing!'"
                className="w-full h-32 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleEncode}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition flex items-center gap-2 mx-auto"
              >
                <Sparkles className="w-5 h-5" />
                Tokenize & Encode
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {tokens.length > 0 && (
              <>
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-4">Step 2: Tokenization Result</h3>
                  <div className="bg-black/30 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-300 mb-2">Original Text:</p>
                    <p className="text-lg font-mono">{inputText}</p>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="text-sm text-gray-300 mb-3">
                      Tokens ({tokens.length} total):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tokens.map((token, idx) => (
                        <div
                          key={idx}
                          className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-4 py-2 rounded-lg border border-purple-400/50"
                        >
                          <span className="font-mono text-lg">{token}</span>
                          <span className="text-xs text-gray-300 ml-2">#{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-4">Step 3: Encoded Values</h3>
                  <div className="bg-black/30 rounded-lg p-4">
                    {valueMode === 'numeric' ? (
                      <div>
                        <p className="text-sm text-gray-300 mb-3">
                          Numeric Representation (what AI models see):
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {encodedValues.map((val, idx) => (
                            <div
                              key={idx}
                              className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 px-4 py-3 rounded-lg border border-cyan-400/50"
                            >
                              <div className="text-xs text-gray-300">Token: {tokens[idx]}</div>
                              <div className="text-2xl font-bold text-cyan-300">{val}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-3 bg-blue-500/20 rounded-lg">
                          <p className="text-sm">
                            <strong>Encoded sequence:</strong> [{encodedValues.join(', ')}]
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-300 mb-3">
                          Visual Representation (easier to understand):
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {encodedValues.map((val, idx) => (
                            <div
                              key={idx}
                              className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 p-4 rounded-xl border border-yellow-400/50 text-center"
                            >
                              <div className="text-5xl mb-2">{val.emoji}</div>
                              <div className="text-sm font-semibold">{val.name}</div>
                              <div className="text-xs text-gray-300 mt-1">"{tokens[idx]}"</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {aiInsight && (
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-400/50">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Brain className="w-6 h-6 text-pink-400" />
                      AI Insights & Analysis
                    </h3>
                    <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {aiInsight}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Decode Tab */}
        {activeTab === 'decode' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Step 1: Enter Encoded Values</h3>
              <p className="text-sm text-gray-300 mb-3">
                Enter comma-separated numeric values (e.g., 72,101,108,108,111 for "Hello" in ASCII)
              </p>
              <textarea
                value={encodedInput}
                onChange={(e) => setEncodedInput(e.target.value)}
                placeholder="Example: 72,101,108,108,111 (for 'Hello')"
                className="w-full h-32 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleDecode}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition flex items-center gap-2 mx-auto"
              >
                <Zap className="w-5 h-5" />
                Decode to Text
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {decodedText && (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Step 2: Decoded Result</h3>
                <div className="bg-black/30 rounded-lg p-6">
                  <p className="text-sm text-gray-300 mb-2">Decoded Text:</p>
                  <p className="text-2xl font-mono font-bold text-green-400">{decodedText}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>💡 This tokenizer demonstrates the core concept used in GPT, BERT, and other transformer models</p>
          <p className="mt-2">Built with ❤️ to understand AI fundamentals</p>
        </div>
      </div>
    </div>
  );
}