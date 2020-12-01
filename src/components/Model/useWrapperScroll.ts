import { useContext, useEffect } from "react";
import { useMotionValue } from "framer-motion";

import ModelsContext from "./ModelsContext";

export default function useWrapperScroll() {
    const { wrapperRef } = useContext(ModelsContext)

    const scrollY = useMotionValue(0)
    const scrollYProgess = useMotionValue(0)

    useEffect(() => {
        if(wrapperRef.current) {
            const updateScrollValue = () => {
                if(wrapperRef.current) {
                    const { scrollTop, scrollHeight, offsetHeight } = wrapperRef.current

                    const fullScroll = scrollHeight - offsetHeight

                    scrollY.set(scrollTop)
                    scrollYProgess.set(scrollTop / fullScroll)
                }
            }

            wrapperRef.current.addEventListener('scroll', updateScrollValue)

            return () => wrapperRef.current?.removeEventListener('scroll', updateScrollValue)
        }
    }, [wrapperRef])

    return { scrollY, scrollYProgess }
}