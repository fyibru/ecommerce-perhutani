export default function ProfilePanel() {
    return (
        <div className="bg-white">
            {/* Sidebar Button */}
            <button
                data-drawer-target="default-sidebar"
                data-drawer-toggle="default-sidebar"
                aria-controls="default-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-emerald-800 rounded-lg sm:hidden hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            {/* Sidebar */}
            <aside
                id="default-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-emerald-100">
                    <div className="pb-8 font-bold text-emerald-700 text-xl">Menu</div>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="#"
                                className="flex items-center p-2 text-emerald-900 rounded-lg hover:bg-emerald-200"
                            >
                                <svg
                                    className="w-5 h-5 text-emerald-700 transition duration-75 group-hover:text-emerald-900"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Halaman Utama</span>
                            </a>
                            <a
                                href="/productView"
                                className="flex items-center p-2 text-emerald-900 rounded-lg hover:bg-emerald-200"
                            >
                                <svg className="w-5 h-5 text-emerald-700 transition duration-75 group-hover:text-emerald-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="ms-3">Barang saya</span>
                            </a>
                            <a href="#"
                                className="flex items-center p-2 text-rose-900 rounded-lg hover:bg-rose-400">
                                <svg className="w-5 h-5 text-rose-700 transition duration-75 group-hover:text-rose-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                </svg>
                                <span className="ms-3">Keluar</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Profile Content */}
            <div className="p-4 sm:ml-64 h-screen bg-white dark:bg-gray-900">
                <section className="w-full h-full overflow-hidden">
                    <div className="flex flex-col items-center">
                        {/* Profile Image */}
                        <div className="w-[90%] sm:w-[80%] flex justify-center relative lg:-top-24">
                            <img
                                src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080"
                                alt="User Profile"
                                className="rounded-full w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 outline-offset-2 outline-blue-500"
                            />
                            <h1 className="absolute bottom-0 sm:bottom-[-4rem] lg:bottom-[-5rem] text-center text-gray-800 dark:text-white font-serif text-xl sm:text-3xl lg:text-4xl">
                                Samuel Abera
                            </h1>
                        </div>

                        {/* Description */}
                        <div className="max-w-4xl w-full mx-auto text-center px-4 py-6">
                            <p className="text-gray-700 dark:text-gray-400 text-sm sm:text-base lg:text-lg">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia dolorem veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi odit, dolore similique fugiat dolor, doloremque eveniet. Odit, consequatur. Ratione voluptate exercitationem hic eligendi vitae animi nam in, est earum culpa illum aliquam.
                            </p>
                        </div>

                        {/* Personal Details */}
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 lg:px-16">
                            <div className="text-gray-900 dark:text-white divide-y divide-gray-200 dark:divide-gray-700">
                                <dl>
                                    <div className="flex flex-col pb-3">
                                        <dt className="mb-1 text-gray-500 dark:text-gray-400">First Name</dt>
                                        <dd className="text-lg font-semibold">Samuel</dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 dark:text-gray-400">Last Name</dt>
                                        <dd className="text-lg font-semibold">Abera</dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 dark:text-gray-400">Date Of Birth</dt>
                                        <dd className="text-lg font-semibold">14/05/1977</dd>
                                    </div>
                                    <div className="flex flex-col py-3">
                                        <dt className="mb-1 text-gray-500 dark:text-gray-400">Gender</dt>
                                        <dd className="text-lg font-semibold">Male</dd>
                                    </div>
                                </dl>
                            </div>
                            <div className="text-gray-900 dark:text-white divide-y divide-gray-200 dark:divide-gray-700">
                                <dl>
                                    <div className="flex flex-col pb-3">
                                        <dt className="mb-1 text-gray-500 dark:text-gray-400">Location</dt>
                                        <dd className="text-lg font-semibold">Ethiopia, Addis Ababa</dd>
                                    </div>
                                    <div className="flex flex-col pt-3">
                                        <dt className="mb-1 text-gray-500 dark:text-gray-400">Phone Number</dt>
                                        <dd className="text-lg font-semibold">+251913****30</dd>
                                    </div>
                                    <div className="flex flex-col pt-3">
                                        <dt className="mb-1 text-gray-500 dark:text-gray-400">Email</dt>
                                        <dd className="text-lg font-semibold">samuel@example.com</dd>
                                    </div>
                                    <div className="flex flex-col pt-3">
                                        <dt className="mb-1 text-gray-500 dark:text-gray-400">Website</dt>
                                        <dd className="text-lg font-semibold hover:text-blue-500">
                                            <a href="https://techakim.com" target="_blank" rel="noopener noreferrer">
                                                https://www.teclick.com
                                            </a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="fixed bottom-20 right-4 flex flex-col gap-2">
                            <a
                                href="https://www.linkedin.com/in/samuel-abera-6593a2209/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-blue-500 hover:text-white rounded-full transition duration-300"
                            >
                                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" />
                                    <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                                </svg>
                            </a>
                            <a
                                href="https://twitter.com/Samuel7Abera7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-blue-400 hover:text-white rounded-full transition duration-300"
                            >
                                <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.youtube.com/@silentcoder7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:bg-red-600 hover:text-white rounded-full transition duration-300"
                            >
                                <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
