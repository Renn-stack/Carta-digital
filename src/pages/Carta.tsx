import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import ChapterNav from '@/components/chapters/ChapterNav';
import ChapterHeader from '@/components/chapters/ChapterHeader';
import ProseBlock from '@/components/chapters/ProseBlock';
import HandwrittenNote from '@/components/chapters/HandwrittenNote';
import PullQuote from '@/components/chapters/PullQuote';
import UninamusBlock from '@/components/chapters/UninamusBlock';
import AdmirationCards from '@/components/chapters/AdmirationCards';
import EmphasisBlock from '@/components/chapters/EmphasisBlock';
import CuboMisterioso from '@/components/chapters/CuboMisterioso';
import EmojiPulse from '@/components/chapters/EmojiPulse';
import BreathingEllipsis from '@/components/chapters/BreathingEllipsis';
import LyricDisplay from '@/components/chapters/LyricDisplay';
import FinalLine from '@/components/chapters/FinalLine';
import CartaFooter from '@/components/chapters/CartaFooter';


gsap.registerPlugin(ScrollTrigger);

/* ─── Accent colours per chapter ─── */
const ACCENTS = [
  '#00E5FF', // 00 Intro — cyan
  '#00E5FF', // 01 ¿Qué significa? — cyan
  '#2979FF', // 02 Color — electric-blue
  '#00BFA5', // 03 Confianza — neon-teal
  '#00BFA5', // 04 Más allá de las etiquetas → teal→amber transition
  '#FFB300', // 05 Sin competencia — amber
  '#FFD54F', // 06 Admiración — gold
  '#FFD54F', // 07 Sin deberes → gold→rose transition
  '#FF4081', // 08 Detalles — rose
  '#FF80AB', // 09 Descanso — blush
  '#FF1744', // 10 Resiliencia — crimson
  '#FF1744', // 11 Transformación → crimson→deep-red
  '#D50000', // 12 Descubrimiento — deep-red
  '#FF1744', // 13 Epílogo — crimson
];

/* ─── Accent colours per chapter ─── */

/* ─── Admiration cards data ─── */
const admirationCards = [
  { title: 'Responsabilidad', body: 'El esfuerzo que pone en lo que hace' },
  { title: 'Disciplina', body: 'Seguir adelante cuando las cosas son difíciles' },
  { title: 'Caballerosidad', body: 'En los detalles cotidianos' },
];

/* ─── Lyric pairs data ─── */
const lyricPairs = [
  {
    spanish: 'Sé que tiene que haber lluvia si quiero ver el arco iris',
    english: 'I know there\'s gotta be rain if I want the rainbows',
  },
  {
    spanish: 'Y sé que cuanto más alto subo, más fuerte sopla el viento',
    english: 'And I know the higher I climb, the harder the wind blows',
  },
];

/* ─── Final line data ─── */
const finalLines = [
  'Lo único que sé es que cuando aparece,',
  'la vida empieza a verse diferente,',
  'más colorida y más viva.',
];

export default function Carta() {
  const pageRef = useRef<HTMLDivElement>(null);

  /* ─── Color scrubbing: update --accent as user scrolls ─── */
  useGSAP(() => {
    if (!pageRef.current) return;

    const chapterEls = pageRef.current.querySelectorAll('[data-chapter-index]');

    chapterEls.forEach((el, i) => {
      const nextColor = ACCENTS[i + 1] || ACCENTS[i];

      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
          const progress = self.progress;
          const current = ACCENTS[i];
          const next = nextColor;
          // Simple interpolation between the two hex colours
          const interpolated = interpolateColor(current, next, progress);
          document.documentElement.style.setProperty('--accent', interpolated);
        },
      });
    });
  }, { scope: pageRef });

  return (
    <div ref={pageRef} className="relative">
      {/* Chapter Navigation (fixed left edge) */}
      <ChapterNav chapterCount={14} accentColors={ACCENTS} />

      {/* ═══════════════════════════════════════════
          CAPÍTULO 0 — Introducción
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={0}
        number="// 00"
        title="Querida nota digital"
        subtitle="Es algo cursi lo que voy a escribir..."
        accentColor={ACCENTS[0]}
      />

      {/* ═══════════════════════════════════════════
          CAPÍTULO I — La Pregunta
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={1}
        number="// 01"
        title="¿Qué significa?"
        subtitle="¿Qué significa realmente estar unidos a alguien?"
        accentColor={ACCENTS[1]}
      />
      <ProseBlock
        paragraphs={[
          '¿Qué significa realmente estar unidos a alguien?',
          'No sé si el amor necesita una definición exacta para existir.',
          'Hay cosas que son reales antes de que encontremos una palabra para nombrarlas.',
        ]}
        accentColor={ACCENTS[1]}
      />
      <HandwrittenNote
        text="pero bueno, primero de todo..."
        accentColor={ACCENTS[1]}
        offset="right"
        rotation={2}
      />

      {/* Spacer */}
      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO II — Color
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={2}
        number="// 02"
        title="Color"
        subtitle="La vida tiene mucho más color"
        accentColor={ACCENTS[2]}
      />
      <ProseBlock
        paragraphs={[
          'Estar con Dorian ha sido como descubrir una nueva perspectiva de la vida.',
          'Antes todo era estable, pero ahora siento que la vida tiene mucho más color.',
          'La conexión intensa que tenemos es algo que nunca había experimentado.',
        ]}
        accentColor={ACCENTS[2]}
      />
      <PullQuote
        text="En el fondo, a veces siento como si ya lo hubiera conocido antes y, al mismo tiempo, seguimos descubriéndonos cada día."
        accentColor={ACCENTS[2]}
      />

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO III — Confianza
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={3}
        number="// 03"
        title="Confianza"
        subtitle="Una confianza muy grande en muchos aspectos"
        accentColor={ACCENTS[3]}
      />
      <ProseBlock
        paragraphs={[
          'Tenemos una confianza muy grande en muchos aspectos, incluso en los más íntimos.',
          'Y bueno, sobre eso… hubo dos ocasiones en mi vida en las que estuve a punto de perder mi virginidad, pero no lo hice porque mi intuición me decía que ese no era el momento ni la persona.',
          'Con él fue diferente. Mi intuición me dijo algo así como: "sí, pero con cuidado".',
        ]}
        accentColor={ACCENTS[3]}
      />
      <HandwrittenNote
        text="jajaja"
        accentColor={ACCENTS[3]}
        offset="left"
        rotation={-2}
      />
      <ProseBlock
        paragraphs={[
          'Y la verdad es que nunca hubo presión. Además, ya estando egresada, tampoco existían las preocupaciones de antes: los rumores, la universidad o las opiniones ajenas. Todo se sintió tranquilo y correcto.',
          'Al principio dolía, pero después lo disfruté. Fue como si estuviera entregando una parte muy sagrada de mí a alguien en quien realmente confiaba.',
        ]}
        accentColor={ACCENTS[3]}
      />

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO IV — Más allá de las etiquetas
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={4}
        number="// 04"
        title="Más allá de las etiquetas"
        subtitle="¿Realmente son necesarias esas palabras para que algo exista?"
        accentColor={ACCENTS[4]}
      />
      <ProseBlock
        paragraphs={[
          'Aunque no somos novios, en el fondo siento que somos algo.',
          'Y me pongo a pensar que el mundo suele definir las relaciones con etiquetas: novios, comprometidos, esposos. Pero realmente son necesarias esas palabras para que algo exista?',
          'No sé si él piense igual, pero yo siento que somos lo que somos, independientemente de cómo lo nombre la sociedad.',
        ]}
        accentColor={ACCENTS[4]}
      />

      {/* THE UNINAMUS REVEAL */}
      <UninamusBlock />

      <ProseBlock
        paragraphs={[
          'Tal vez lo describiría como dos personas caminando juntas por el mundo, observándolo y descubriéndolo lado a lado, una unión que existe por sí misma.',
          'A veces pienso que las palabras existentes no alcanzan para describir ciertas conexiones. Por eso, si tuviera que inventar una, quizá la llamaría Uninamus o Unamus, no sé porque pero creo que describiría así.',
          'Uni porque es unión, namu lo saque de human al revés y le quite la h, y s es plural. Jeje, no me convence al 100% ese nombre pero buscaré otro nombre.',
        ]}
        accentColor={ACCENTS[4]}
      />
      <HandwrittenNote
        text="Jeje, no me convence al 100%"
        accentColor="#FFB300"
        offset="right"
        rotation={3}
      />

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO V — Sin competencia
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={5}
        number="// 05"
        title="Sin competencia"
        subtitle="Lo que tenemos es nuestro y eso es suficiente"
        accentColor={ACCENTS[5]}
      />
      <ProseBlock
        paragraphs={[
          'Descubrí que el amor no tiene que sentirse como una competencia, por eso quizá ya no tengo la necesidad de compararnos con otras parejas.',
          'Cuando estaba con mis ex sí lo hacía: quién era más guapo, más inteligente, más fuerte o algo así, pero también era adolescente y mi forma de ver las relaciones era diferente.',
          'Ya no me interesa compararnos con otras parejas. Lo que tenemos es nuestro y eso es suficiente.',
        ]}
        accentColor={ACCENTS[5]}
      />

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO VI — Admiración
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={6}
        number="// 06"
        title="Admiración"
        subtitle="La caballerosidad no está en los grandes gestos"
        accentColor={ACCENTS[6]}
      />
      <ProseBlock
        paragraphs={[
          'Admiro profundamente su capacidad de seguir adelante incluso cuando las cosas son difíciles.',
          'Admiro su responsabilidad, su disciplina y el esfuerzo que pone en lo que hace.',
          'También admiro su forma de tratar a las personas, porque la caballerosidad no está en los grandes gestos, sino en los detalles cotidianos.',
        ]}
        accentColor={ACCENTS[6]}
      />
      <AdmirationCards cards={admirationCards} />

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO VII — Sin deberes
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={7}
        number="// 07"
        title="Sin deberes"
        subtitle="No me debe nada. Lo elijo porque disfruto compartir mi vida con él."
        accentColor={ACCENTS[7]}
      />
      <ProseBlock
        paragraphs={[
          'Es un chico muy caballeroso y me trata muy bonito.',
          'Honestamente, no esperaba eso. Tampoco espero nada de él. No me debe una casa, un coche, dinero ni ningún tipo de promesa material. No me debe nada.',
          'No necesito que me rescate, me mantenga o me complete. Lo elijo porque disfruto compartir mi vida con él.',
        ]}
        accentColor={ACCENTS[7]}
      />
      <EmphasisBlock text="No me debe nada." />
      <ProseBlock
        paragraphs={[
          'Y, sin embargo, si algún día decide darme algo, creo que me emocionaría mucho más que fuera una manualidad hecha por él o alguna tecnología creada con sus propias manos.',
        ]}
        accentColor={ACCENTS[7]}
      />
      <HandwrittenNote
        text="Eso se me hace increíblemente especial y, debo admitirlo, bastante atractivo pero muy sexy"
        accentColor="#FF4081"
        offset="right"
        rotation={2}
      />

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO VIII — Detalles
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={8}
        number="// 08"
        title="Detalles"
        subtitle="Para mí tienen un significado enormeeee"
        accentColor={ACCENTS[8]}
      />
      <div className="mx-auto max-w-[720px] px-[clamp(1.5rem,5vw,4rem)] pb-8 pt-12">
        <p
          className="prose-paragraph"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontWeight: 300,
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            color: 'var(--light-gray)',
          }}
        >
          De hecho, Dorian me compartió el enlace de una página web que me hizo llorar, pero de una manera bonita.{' '}
          <EmojiPulse emoji="🤩" />
        </p>
      </div>
      <ProseBlock
        paragraphs={[
          'También me regaló el cubo misterioso, que me recuerda a esos mundos de fantasía creados en Blender. Son detalles que para muchas personas podrían parecer simples, pero para mí tienen un significado enormeeee.',
        ]}
        accentColor={ACCENTS[8]}
      />
      <CuboMisterioso />
      <div className="mx-auto max-w-[720px] px-[clamp(1.5rem,5vw,4rem)] pb-8">
        <p
          className="prose-paragraph"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
            fontWeight: 300,
            lineHeight: 1.8,
            letterSpacing: '0.01em',
            color: 'var(--light-gray)',
          }}
        >
          Me pone sentimental escribir todo esto aunque suene muy cursi jajaja.
        </p>
      </div>
      <HandwrittenNote
        text="jajaja"
        accentColor={ACCENTS[8]}
        offset="right"
        rotation={2}
      />
      <ProseBlock
        paragraphs={[
          'Y hablando de detalles, nunca he entendido del todo las flores.',
          'No sé de dónde viene esa tradición de que los hombres regalen flores a las mujeres, realmente son necesarias? Son plantas que fueron arrancadas de donde crecían y que inevitablemente terminarán marchitándose, prefiero que sigan viviendo donde pertenecen.',
        ]}
        accentColor={ACCENTS[8]}
      />
      <div className="mx-auto max-w-[720px] px-[clamp(1.5rem,5vw,4rem)] pb-12 text-center">
        <EmojiPulse emoji="😅" size="1.5em" />
      </div>

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO IX — Descanso
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={9}
        number="// 09"
        title="Descanso"
        subtitle="Mi mente descansa"
        accentColor={ACCENTS[9]}
      />
      <ProseBlock
        paragraphs={[
          'Durante gran parte de mi vida he sentido que tengo que pensar en todo, analizar todo y estar preparada para todo.',
          'Con él ocurre algo extraño, o sea mi mente descansa.',
          'No porque deje de pensar, sino porque dejo de sentir que debo cargar el mundo sola.',
        ]}
        accentColor={ACCENTS[9]}
      />
      <BreathingEllipsis />

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO X — Resiliencia
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={10}
        number="// 10"
        title="Resiliencia"
        subtitle="Sé que tiene que haber lluvia si quiero ver el arco iris"
        accentColor={ACCENTS[10]}
      />
      <ProseBlock
        paragraphs={[
          'También reconozco que somos humanos, puede haber celos, conversaciones incómodas, desacuerdos o momentos difíciles.',
        ]}
        accentColor={ACCENTS[10]}
      />
      <LyricDisplay pairs={lyricPairs} accentColor={ACCENTS[10]} />
      <ProseBlock
        paragraphs={[
          'No me considero una persona perfecta, ni pretendo serlo, pero dentro de las capacidades, la conciencia y la experiencia que tengo hoy, hago lo mejor que puedo.',
        ]}
        accentColor={ACCENTS[10]}
      />

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO XI — Transformación
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={11}
        number="// 11"
        title="Transformación"
        subtitle="Dispuesta a transformarme, a crecer y a desarrollarme"
        accentColor={ACCENTS[11]}
      />
      <ProseBlock
        paragraphs={[
          'Y algo que sé con certeza es que estoy dispuesta a transformarme, a crecer y a desarrollarme y creo que eso es parte de lo bonito de compartir la vida con alguien.',
          'Y digo sé que habrá obstáculos, algunos incluso muy difíciles, pero tampoco soy una persona que se rinda fácilmente.',
        ]}
        accentColor={ACCENTS[11]}
      />
      <HandwrittenNote
        text="Supongo que ese es mi problema positivo jajaja"
        accentColor="#D50000"
        offset="left"
        rotation={-1}
      />

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO XII — Descubrimiento
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={12}
        number="// 12"
        title="Descubrimiento"
        subtitle="Una versión de mí que puede relajarse"
        accentColor={ACCENTS[12]}
      />
      <ProseBlock
        paragraphs={[
          'Algo de mí con él:',
          'Descubrí una versión de mí que no está constantemente alerta. Una versión que puede relajarse, equivocarse, reírse y simplemente existir sin sentir que debe demostrar algo.',
          'A veces pienso que lo que más valoro no es la perfección de una relación, sino la disposición de dos personas para seguir construyéndose a sí mismas mientras caminan juntas.',
          'A veces me pregunto cuántas decisiones, casualidades y caminos tuvieron que cruzarse para que nos encontráramos.',
          'No sé cuánto durará esta historia ni qué forma tomará en el futuro, pero agradezco profundamente poder vivirla.',
        ]}
        accentColor={ACCENTS[12]}
      />
      <HandwrittenNote
        text="agradezco profundamente poder vivirla"
        accentColor={ACCENTS[12]}
        offset="right"
        rotation={1}
        large
      />

      <div className="h-[16rem]" />

      {/* ═══════════════════════════════════════════
          CAPÍTULO XIII — Epílogo: El origen
          ═══════════════════════════════════════════ */}
      <ChapterHeader
        index={13}
        number="// 13"
        title="El origen"
        subtitle="La vida se siente un poco más grande"
        accentColor={ACCENTS[13]}
        extended
        bgGradient
      />
      <ProseBlock
        paragraphs={[
          'No sé exactamente de dónde proviene el amor.',
          'Tal vez nace de la admiración, de la confianza o de la decisión de compartir la vida con alguien.',
        ]}
        accentColor={ACCENTS[13]}
      />
      <FinalLine lines={finalLines} />

      {/* ═══ FOOTER ═══ */}
      <CartaFooter />
    </div>
  );
}

/* ─── Hex colour interpolation helper ─── */
function interpolateColor(color1: string, color2: string, factor: number): string {
  const hex = (x: number) => {
    const h = Math.round(x).toString(16);
    return h.length === 1 ? '0' + h : h;
  };

  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = r1 + (r2 - r1) * factor;
  const g = g1 + (g2 - g1) * factor;
  const b = b1 + (b2 - b1) * factor;

  return `#${hex(r)}${hex(g)}${hex(b)}`;
}
