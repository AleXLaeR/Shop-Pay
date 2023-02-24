import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-blue h-screen flex-center pb-20 overflow-hidden relative z-10 top-1/2">
      <div className="mx-auto">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[350px] text-center">
              <span className="text-[50px] text-success mr-2 font-bold leading-none sm:text-[80px] md:text-[100px]">
                4
              </span>
              <span className="text-[50px] text-yellow mr-2 font-bold leading-none sm:text-[80px] md:text-[100px]">
                0
              </span>
              <span className="text-[50px] text-error-secondary font-bold leading-none sm:text-[80px] md:text-[100px]">
                4
              </span>
              <h4 className="mb-3 mt-5 text-[22px] font-semibold leading-tight text-white">
                Oops! The content can’t be found
              </h4>
              <p className="mb-8 text-lg text-white text-lg font-medium">
                The page you were trying to reach may be moved or deleted permanently
              </p>
              <p className="text-center my-5 text-lg text-white">
                If you believe that this content must be present, please contact us with the button
                below
              </p>
              <div className="flex-between">
                <Link
                  href="/"
                  className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-blue-darkish"
                >
                  Go To Home
                </Link>
                <Link
                  href="/contact"
                  className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-violet"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
        <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
        <div className="flex h-full w-1/3">
          <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
          <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
        </div>
        <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
      </div>
    </section>
  );
}
