import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getNetwork, watchNetwork } from "wagmi/actions";

export default function Header() {
    const [currentChain, setCurrentChain] = useState<{
        name: string | undefined;
    } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const { chain, chains } = getNetwork();

        setCurrentChain({ name: chain?.name });

        const unwatch = watchNetwork((network) => {
            setCurrentChain({ name: network.chain?.name });
        });

        return unwatch;
    }, []);

    const { pathname } = router;
    return (
        <Disclosure as="nav" className="bg-prosperity border-b border-black">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                                    <span className="sr-only">
                                        Open main menu
                                    </span>
                                    {open ? (
                                        <XMarkIcon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Bars3Icon
                                            className="block h-6 w-6"
                                            aria-hidden="true"
                                        />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Image
                                        className="block h-8 w-auto sm:block lg:block"
                                        src="/logo.svg"
                                        width="24"
                                        height="24"
                                        alt="Celo Logo"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                    <a
                                        href="/"
                                        className={`inline-flex items-center ${
                                            pathname === "/"
                                                ? "border-b-2 border-black"
                                                : ""
                                        } px-1 pt-1 text-sm font-medium text-gray-900`}
                                    >
                                        Home
                                    </a>
                                    <a
                                        href="/storage"
                                        className={`inline-flex ${
                                            pathname === "/storage"
                                                ? "border-b-2 border-black"
                                                : ""
                                        } items-center px-1 pt-1 text-sm font-medium text-gray-900`}
                                    >
                                        Storage
                                    </a>
                                    <a
                                        href="/masa"
                                        className={`inline-flex ${
                                            pathname === "/masa"
                                                ? "border-b-2 border-black"
                                                : ""
                                        } items-center px-1 pt-1 text-sm font-medium text-gray-900`}
                                    >
                                        Masa
                                    </a>
                                    {currentChain?.name === "Celo" ? (
                                        <a
                                            href="/spirals"
                                            className={`inline-flex ${
                                                pathname === "/spirals"
                                                    ? "border-b-2 border-black"
                                                    : ""
                                            } items-center px-1 pt-1 text-sm font-medium text-gray-900`}
                                        >
                                            Spirals
                                        </a>
                                    ) : null}
                                    <a
                                        href="/nft"
                                        className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                                            pathname === "/nft"
                                                ? "border-b-2 border-black"
                                                : ""
                                        } text-gray-900`}
                                    >
                                        NFT
                                    </a>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <ConnectButton
                                    showBalance={{
                                        smallScreen: true,
                                        largeScreen: false,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 pt-2 pb-4">
                            <Disclosure.Button
                                as="a"
                                href="/"
                                className={`block ${
                                    pathname === "/"
                                        ? "border-l-4 border-black"
                                        : ""
                                } py-2 pl-3 pr-4 text-base font-medium text-black`}
                            >
                                Home
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="/storage"
                                className={`block py-2 pl-3 pr-4 text-base font-medium text-black ${
                                    pathname === "/storage"
                                        ? "border-l-4 border-black"
                                        : ""
                                }`}
                            >
                                Storage
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="/storage"
                                className={`block py-2 pl-3 pr-4 text-base font-medium text-black ${
                                    pathname === "/masa"
                                        ? "border-l-4 border-black"
                                        : ""
                                }`}
                            >
                                Masa
                            </Disclosure.Button>
                            {currentChain?.name === "Celo" ? (
                                <Disclosure.Button
                                    as="a"
                                    href="/spirals"
                                    className={`block py-2 pl-3 pr-4 text-base font-medium text-black ${
                                        pathname === "/spirals"
                                            ? "border-l-4 border-black"
                                            : ""
                                    }`}
                                >
                                    Spirals
                                </Disclosure.Button>
                            ) : null}
                            <Disclosure.Button
                                as="a"
                                href="/nft"
                                className={`block py-2 pl-3 pr-4 text-base font-medium text-black ${
                                    pathname === "/nft"
                                        ? "border-l-4 border-black"
                                        : ""
                                }`}
                            >
                                NFT
                            </Disclosure.Button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
