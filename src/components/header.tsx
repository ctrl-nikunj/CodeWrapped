'use client'
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export default function Header() {
    return (
        <motion.header className="sticky top-0 z-50 backdrop-blur"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl text-foreground font-semibold tracking-tight">
                    CodeWrapped
                </Link>
                <Link href="https://www.github.com/ctrl-nikunj/CodeWrapped" target="_blank" >
                    <Button className='hover:bg-background hover:text-foreground transition-colors rounded-xl'>
                        GitHub
                    </Button>
                </Link>
            </div>
        </motion.header>
    )
}