import { motion } from 'framer-motion';
import React from 'react';


const animateText = (text: string, isInView: boolean): React.ReactNode => {
    return text.split(' ').map((word, i) => (<React.Fragment key={i}>
        <motion.span
            style={{ display: 'inline-block' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 100 }} exit={{ opacity: 0 }} >
            {word}
        </motion.span>
        &nbsp;
    </React.Fragment>
    ));
}


export {
    animateText
}