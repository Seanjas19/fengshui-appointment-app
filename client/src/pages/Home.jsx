
const Home = () => {
    return (
        <div className="min-h-screen bg-ghost-white flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl w-full text-center space-y-8">
                <h1 className="text-6xl font-serif text-mystic-green animate-pulse">
                    占扑 & 塔罗
                </h1>
                <p className="text-xl text-slate-dark font-sans max-w-2xl mx-auto leading-relaxed">
                    Welcome to your professional Bazi and Feng Shui consultation. 
                    Balance your energy and find your path.
                </p>
                <div className="flex gap-4 justify-center">
                    <button className="bg-mystic-green text-ghost-white px-8 py-3 rounded-full font-bold hover:bg-slate-dark transition-all">
                        Book Now
                    </button>
                    <button className="border-2 border-mystic-green text-mystic-green px-8 py-3 rounded-full font-bold hover:bg-sage-light transition-all">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Home;