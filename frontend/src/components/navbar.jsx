export default function Navbar() {
    return <>
        <nav className="h-16 w-full bg-red-400 text-gray-200 font-semibold text-2xl flex justify-between p-4">
            <h1>Micromsg</h1>
            <div className="flex items-center space-x-10">
                <p>Feed</p>
                <p>User</p>
            </div>
        </nav>
    </>
}