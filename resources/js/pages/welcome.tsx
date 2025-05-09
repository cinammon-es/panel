import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function WelcomePanel() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: false,
            easing: 'ease-out',
        });
    }, []);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&display=swap" rel="stylesheet" />
            </Head>

            <div id="top" className="relative flex min-h-screen flex-col overflow-x-hidden scroll-smooth bg-black font-[Orbitron] text-white">
                <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[length:22px_22px] opacity-20" />

                {/* NAVBAR FIJO */}
                <header className="animate-fade-in fixed top-0 z-50 flex w-full flex-wrap items-center justify-between gap-4 border-b border-pink-600 bg-black/70 p-6 backdrop-blur-md">
                    <Link href={route('home')} data-aos="fade-right">
                        <img src="/favicon.ico" alt="Cinammon.net Logo" className="h-10 transition hover:opacity-80 sm:h-12" draggable={false} />
                    </Link>
                    <nav className="flex gap-3" data-aos="fade-left">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md bg-pink-500 px-4 py-2 font-semibold text-white shadow transition hover:bg-pink-600"
                            >
                                Panel
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md bg-gradient-to-r from-pink-500 to-fuchsia-600 px-4 py-2 font-semibold text-white shadow hover:from-pink-600 hover:to-fuchsia-700"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md border border-pink-400 px-4 py-2 font-semibold text-pink-300 transition hover:bg-pink-400 hover:text-black"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* SECCIÓN 1 */}
                <section
                    className="relative z-10 mt-28 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center sm:px-10"
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-bottom"
                >
                    <div
                        className="w-full max-w-3xl rounded-xl border-2 border-pink-500 bg-black/60 px-6 py-12 shadow-[0_0_30px_5px_rgba(255,0,150,0.3)] backdrop-blur-sm sm:px-10 sm:py-16"
                        data-aos="zoom-in"
                    >
                        <h1 className="mb-4 text-4xl font-extrabold tracking-widest text-pink-400 sm:text-5xl" data-aos="fade-up">
                            <span className="text-[#00f7ff]">cinammon</span>.net
                        </h1>
                        <p className="text-xl font-semibold text-pink-300 sm:text-2xl" data-aos="fade-up" data-aos-delay="100">
                            Tu red. Tu dominio. Tu juego.
                        </p>
                        <p className="mt-4 text-sm text-pink-400 sm:text-base" data-aos="fade-up" data-aos-delay="200">
                            ¡Únete a nosotros y forma parte de la comunidad desplegando tu panel!
                        </p>
                        <div className="mt-6 sm:mt-8" data-aos="zoom-in" data-aos-delay="300">
                            <Link
                                href={route('register')}
                                className="rounded-md bg-gradient-to-r from-pink-500 to-fuchsia-600 px-6 py-2 font-semibold text-white shadow hover:from-pink-600 hover:to-fuchsia-700"
                            >
                                DEMO
                            </Link>
                        </div>
                    </div>

                    {/* FLECHA HACIA ABAJO */}
                    <div className="mt-10 flex justify-center" data-aos="zoom-in" data-aos-delay="400">
                        <a href="#seccion-siguiente">
                            <img
                                src="https://img.icons8.com/?size=100&id=44002&format=png&color=ff4da6"
                                alt="Desplazar hacia abajo"
                                className="h-10 w-10 animate-bounce drop-shadow-[0_0_6px_#ff4da6] sm:h-10 sm:w-12"
                                draggable={false}
                            />
                        </a>
                    </div>
                </section>

                {/* SECCIÓN DESCRIPCIÓN */}
                <section
                    id="seccion-siguiente"
                    className="relative z-10 flex flex-col items-center justify-center gap-10 px-6 py-20 text-center text-white sm:px-10"
                >
                    <h1 className="mb-6 text-3xl font-bold text-pink-400 sm:text-4xl" data-aos="fade-up">
                        ¿Por qué elegir el Panel Cinammon?
                    </h1>
                    <p className="text-lg font-semibold text-pink-300 sm:text-xl" data-aos="fade-up" data-aos-delay="100">
                        El Panel Cinammon es la solución perfecta para gestionar tu red de forma rápida y sencilla. Con un diseño moderno y una
                        interfaz intuitiva, podrás administrar usuarios, roles y configuraciones del sistema sin complicaciones. Además, su
                        rendimiento optimizado garantiza una experiencia fluida y rápida, con estadísticas en tiempo real para que siempre estés al
                        tanto de la actividad de tu red.
                    </p>
                    <div
                        className="w-full max-w-4xl rounded-xl border-2 border-fuchsia-600 bg-black/50 px-6 py-12 shadow-[0_0_30px_5px_rgba(255,0,150,0.3)] backdrop-blur-md"
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    >
                        <h2 className="mb-6 text-3xl font-bold text-pink-400 sm:text-4xl" data-aos="fade-up" data-aos-delay="300">
                            Características del Panel Cinammon
                        </h2>
                        <div className="grid grid-cols-1 gap-8 text-left text-sm text-pink-100 sm:grid-cols-2 sm:text-base">
                            <div data-aos="fade-up" data-aos-delay="400">
                                <h3 className="mb-1 text-lg font-semibold text-pink-400">⚙️ Control total</h3>
                                <p>Gestiona usuarios, roles y configuraciones del sistema con una interfaz clara y rápida.</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="500">
                                <h3 className="mb-1 text-lg font-semibold text-pink-400">🎨 Personalización visual</h3>
                                <p>Cambia colores, temas y diseño con un solo clic. Estilo cyber garantizado.</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="600">
                                <h3 className="mb-1 text-lg font-semibold text-pink-400">🚀 Rendimiento extremo</h3>
                                <p>Panel optimizado para ofrecerte velocidad, fluidez y animaciones suaves.</p>
                            </div>
                            <div data-aos="fade-up" data-aos-delay="700">
                                <h3 className="mb-1 text-lg font-semibold text-pink-400">📈 Estadísticas en vivo</h3>
                                <p>Consulta actividad en tiempo real con gráficos, logs y métricas clave.</p>
                            </div>
                        </div>
                        <div className="mt-10" data-aos="zoom-in" data-aos-delay="800">
                            <Link
                                href={route('dashboard')}
                                className="rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-500 px-6 py-2 font-semibold text-white shadow hover:from-fuchsia-700 hover:to-pink-600"
                            >
                                Acceder al Panel
                            </Link>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN ESTADÍSTICAS */}
                <section className="relative z-10 flex flex-col items-center justify-center gap-12 px-6 py-20 text-center text-white sm:px-10">
                    <h2 className="text-3xl font-bold text-pink-400 sm:text-4xl" data-aos="fade-up">
                        📊 Nuestras estadísticas
                    </h2>
                    <div className="grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                        <div className="rounded-lg bg-black/60 p-6 shadow-md backdrop-blur-md" data-aos="fade-up" data-aos-delay="100">
                            <p className="text-3xl font-extrabold text-fuchsia-400">+3K</p>
                            <p className="text-sm text-pink-100">Usuarios registrados</p>
                        </div>
                        <div className="rounded-lg bg-black/60 p-6 shadow-md backdrop-blur-md" data-aos="fade-up" data-aos-delay="200">
                            <p className="text-3xl font-extrabold text-fuchsia-400">99.9%</p>
                            <p className="text-sm text-pink-100">Uptime del sistema</p>
                        </div>
                        <div className="rounded-lg bg-black/60 p-6 shadow-md backdrop-blur-md" data-aos="fade-up" data-aos-delay="300">
                            <p className="text-3xl font-extrabold text-fuchsia-400">+850</p>
                            <p className="text-sm text-pink-100">Servidores activos</p>
                        </div>
                        <div className="rounded-lg bg-black/60 p-6 shadow-md backdrop-blur-md" data-aos="fade-up" data-aos-delay="400">
                            <p className="text-3xl font-extrabold text-fuchsia-400">24/7</p>
                            <p className="text-sm text-pink-100">Soporte disponible</p>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN GALERÍA */}
                <section className="relative z-10 flex flex-col items-center justify-center gap-12 px-6 py-20 text-center text-white sm:px-10">
                    <h2 className="text-3xl font-bold text-pink-400 sm:text-4xl" data-aos="fade-up">
                        🖼️ Galería de Cinammon
                    </h2>
                    <div className="grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="overflow-hidden rounded-xl shadow-lg" data-aos="zoom-in" data-aos-delay={i * 100}>
                                <img
                                    src={`https://source.unsplash.com/random/800x600?sig=${i}&cinammon`}
                                    alt={`Cinammon vista ${i}`}
                                    className="h-60 w-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* TESTIMONIOS EN CARRUSEL */}
                <section className="relative z-10 flex flex-col items-center justify-center gap-12 px-6 py-20 text-center text-white sm:px-10">
                    <h2 className="text-3xl font-bold text-pink-400 sm:text-4xl" data-aos="fade-up">
                        💬 Testimonios de nuestros usuarios
                    </h2>
                    <div className="relative w-full max-w-4xl overflow-hidden">
                        <div className="carousel animate-slide-x flex gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="min-w-full rounded-lg bg-black/60 p-6 shadow-md backdrop-blur-md"
                                    data-aos="fade-up"
                                    data-aos-delay={100 * (i + 1)}
                                >
                                    <p className="text-lg font-semibold text-pink-300">
                                        {i % 3 === 0 && '"El Panel Cinammon ha transformado la forma en que gestiono mi red. ¡Increíble!"'}
                                        {i % 3 === 1 && '"La personalización es asombrosa. ¡Me encanta el estilo cyber!"'}
                                        {i % 3 === 2 && '"El soporte es excepcional. Siempre están ahí para ayudarme."'}
                                    </p>
                                    <p className="mt-4 text-sm text-pink-100">— Usuario {i + 1}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <style>{`
                    @keyframes slide-x {
                        0% { transform: translateX(0); }
                        33% { transform: translateX(-100%); }
                        66% { transform: translateX(-200%); }
                        100% { transform: translateX(0); }
                    }
                    .animate-slide-x {
                        animation: slide-x 20s linear infinite;
                    }
                `}</style>

                <footer className="w-full border-t border-neutral-700 bg-neutral-900 text-neutral-300">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 text-sm sm:grid-cols-3">
                        <div className="flex flex-col items-start gap-4">
                            <img src="/favicon.ico" alt="Logo Cinammon" className="h-12 w-auto" draggable={false} />
                            <p className="leading-relaxed text-neutral-400">
                                cinammon.net es una plataforma de gestión moderna para redes y comunidades digitales.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="mb-1 font-semibold text-white">Secciones</h3>
                            <Link href={route('home')} className="hover:text-white hover:underline">
                                Inicio
                            </Link>
                            <Link href={route('dashboard')} className="hover:text-white hover:underline">
                                Panel
                            </Link>
                            <Link href={route('register')} className="hover:text-white hover:underline">
                                Registro
                            </Link>
                            <Link href={route('login')} className="hover:text-white hover:underline">
                                Acceso
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="mb-1 font-semibold text-white">Información</h3>
                            <a href="mailto:soporte@cinammon.net" className="hover:text-white hover:underline">
                                Contacto
                            </a>
                            <a href="/politica-privacidad" className="hover:text-white hover:underline">
                                Política de privacidad
                            </a>
                            <a href="/terminos-condiciones" className="hover:text-white hover:underline">
                                Términos y condiciones
                            </a>
                        </div>
                    </div>
                    <div className="border-t border-neutral-700 px-6 py-4 text-center text-xs text-neutral-500">
                        © {new Date().getFullYear()} cinammon.net — Todos los derechos reservados.
                    </div>
                </footer>

                {/* BOTÓN FLOTANTE A DISCORD */}

                <a href="https://discord.gg/tuservidor" target="_blank" data-aos="fade-left">
                    <img src="https://img.icons8.com/?size=100&id=30998&format=png&color=ffffff" alt="Discord" className="h-8 w-8" />
                </a>
                <a
                    href="https://youtube.com/cinammon"
                    target="_blank"
                    className="fixed bottom-6 left-6 z-50 rounded-full bg-[#5865F2] p-3 shadow-lg transition hover:scale-110"
                    data-aos="fade-left"
                >
                    <img src="https://img.icons8.com/?size=100&id=30998&format=png&color=ffffff" alt="Discord" className="h-8 w-8" />
                </a>
                {/* FLECHA PARA SUBIR */}
                <a href="#top" className="fixed right-6 bottom-6 z-50 animate-bounce p-7 transition hover:opacity-90">
                    <img
                        src="https://img.icons8.com/?size=100&id=71020&format=png&color=ff4da6"
                        alt="Subir arriba"
                        className="h-8 w-8 drop-shadow-[0_0_6px_#ff4da6] sm:h-9 sm:w-9"
                        draggable={false}
                    />
                </a>
            </div>
        </>
    );
}
