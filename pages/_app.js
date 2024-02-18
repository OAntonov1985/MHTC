import "@/styles/globals.css";
import { Ubuntu, Poppins } from 'next/font/google';
import Layout from '@/components/Layout/Layout';
// import PersistWrapper from 'next-persist/lib/NextPersistWrapper';


// const npConfig = {
//     method: 'localStorage'

// };

const ubuntu = Ubuntu({
    subsets: ['cyrillic'],
    weight: ["300", "400", "500", '700'],
})

const poppins = Poppins({
    subsets: ['latin'],
    weight: ["300", "400", "500", '700'],
});
export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Layout>
                {/* <PersistWrapper wrapperConfig={npConfig}> */}
                <div className={ubuntu.className}>
                    <Component {...pageProps} />
                </div>
                {/* </PersistWrapper> */}
            </Layout>
        </>

    )

}
