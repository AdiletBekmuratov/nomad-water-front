import { Header } from '@/components/Catalog/Header';
import { dataBottle } from '@/assets/dataBottle';
import { FC, useState } from 'react';
import { CardBottle } from '@/components/Catalog';
import { Link } from 'react-router-dom';

import logo from '../assets/crm/logoHead.png';
import avatar from '../assets/crm/avatar.png';
import { Search } from '@/components/Catalog/Search';

const Catalog: FC = () => {
  const [counter, setCounter] = useState<number>(1);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const searchArray = dataBottle.filter((items) =>
    items.title.toLowerCase().includes(value.toLowerCase())
  );
  return (
    <div className={`w-full  bg-bg-crm `}>
      <Header>
        <>
          <svg
            className={`hidden lg:block mr-16`}
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 12.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 17.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <Link to="/" className={`mx-auto`}>
            <img src={logo} alt="nomadLogo" />
          </Link>

          <Link to="/catalog" className={`cursor-pointer lg:mr-16 flex justify-end relative`}>
            <svg
              width="24"
              height="22"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.37739 12.444C8.17043 12.5187 7.82957 12.5187 7.62261 12.444C5.85739 11.8285 1 8.32798 1 3.97565C1 2.0544 2.51565 0.5 4.38435 0.5C6.18368 0.5 7.02595 1.44965 7.60589 2.26215C7.80315 2.53852 8.19685 2.53852 8.39411 2.26215C8.97406 1.44965 9.81635 0.5 11.6157 0.5C13.4843 0.5 15 2.0544 15 3.97565C15 8.32798 10.1426 11.8285 8.37739 12.444Z"
                stroke="#023646"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="absolute -top-1 -right-2"
              width="6"
              height="7"
              viewBox="0 0 6 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="3" cy="3.5" r="3" fill="#DB1A1A" fillOpacity="0.8" />
            </svg>
          </Link>
          <img src={avatar} alt="avatar" className={`hidden lg:block mr-4`} />
        </>
      </Header>
      <div className={``}>
        <div className={`px-7 lg:px-48 xl:px-72 text-xs `}>
          <Search value={value} setValue={setValue} />

          <div className={`grid gap-x-4 gap-y-6 pt-6 grid-cols-2 sm:grid-cols-1 `}>
            {value.length === 0
              ? dataBottle
                  .slice(0, 4)
                  .map((items, id) => (
                    <CardBottle
                      key={id}
                      items={items}
                      isFavourite={isFavourite}
                      setIsFavourite={setIsFavourite}
                      counter={counter}
                      setCounter={setCounter}
                    />
                  ))
              : searchArray.map((items, id) => (
                  <CardBottle
                    key={id}
                    items={items}
                    isFavourite={isFavourite}
                    setIsFavourite={setIsFavourite}
                    counter={counter}
                    setCounter={setCounter}
                  />
                ))}
          </div>
          <div
            className={`border-b border-solid border-y border-gray-300 mt-8 mb-4 md:border-none`}></div>
        </div>

        <div className={`bg-white px-20 pt-5 pb-8 flex items-center justify-between lg:hidden`}>
          <a href="/" className={`cursor-pointer`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 12.6667C21.9122 12.6672 21.8253 12.6504 21.744 12.6172C21.6628 12.584 21.5889 12.5351 21.5266 12.4734L12 2.94001L2.47333 12.4734C2.3458 12.5826 2.18175 12.6396 2.01397 12.6332C1.84618 12.6267 1.68702 12.5571 1.56829 12.4384C1.44956 12.3197 1.38001 12.1605 1.37353 11.9927C1.36705 11.8249 1.42412 11.6609 1.53334 11.5334L11.5333 1.53334C11.6582 1.40917 11.8272 1.33948 12.0033 1.33948C12.1794 1.33948 12.3484 1.40917 12.4733 1.53334L22.4733 11.5334C22.565 11.6269 22.6272 11.7455 22.6519 11.8742C22.6766 12.0029 22.6629 12.136 22.6124 12.257C22.5619 12.3779 22.4768 12.4812 22.3679 12.5541C22.259 12.627 22.131 12.6662 22 12.6667Z"
                fill="#023646"
              />
              <path
                d="M4.92091 21.7459L4.9208 21.7457C4.81149 21.6365 4.75 21.4881 4.75 21.3333V13.5299L12.0015 6.25421L19.25 13.4845V21.3333C19.25 21.488 19.1885 21.6365 19.0792 21.7458C18.9698 21.8552 18.8214 21.9166 18.6667 21.9166H14.75V16V15.25H14H10H9.25V16V21.9166H5.33333C5.17853 21.9166 5.03021 21.8552 4.92091 21.7459Z"
                fill="#023646"
                stroke="#023646"
                strokeWidth="1.5"
              />
            </svg>
          </a>
          <a href="/" className={`cursor-pointer `}>
            <svg
              width="20"
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.606934 1.14286C0.606934 0.972361 0.674663 0.808848 0.795223 0.688289C0.915782 0.56773 1.07929 0.5 1.24979 0.5H3.17836C3.32176 0.50004 3.46102 0.548022 3.57401 0.636318C3.687 0.724613 3.76723 0.848151 3.80193 0.987286L4.32264 3.07143H19.2498C19.3474 3.07146 19.4438 3.09373 19.5315 3.13655C19.6193 3.17938 19.6961 3.24164 19.7562 3.31859C19.8163 3.39555 19.8581 3.48519 19.8784 3.58071C19.8987 3.67623 19.897 3.77511 19.8733 3.86986L17.9448 11.5841C17.9101 11.7233 17.8298 11.8468 17.7168 11.9351C17.6039 12.0234 17.4646 12.0714 17.3212 12.0714H5.74979C5.60639 12.0714 5.46712 12.0234 5.35413 11.9351C5.24114 11.8468 5.16092 11.7233 5.12622 11.5841L2.67693 1.78571H1.24979C1.07929 1.78571 0.915782 1.71798 0.795223 1.59743C0.674663 1.47687 0.606934 1.31335 0.606934 1.14286ZM4.64407 4.35714L6.25122 10.7857H16.8198L18.4269 4.35714H4.64407ZM7.0355 14.6429C6.69451 14.6429 6.36748 14.7783 6.12636 15.0194C5.88525 15.2606 5.74979 15.5876 5.74979 15.9286C5.74979 16.2696 5.88525 16.5966 6.12636 16.8377C6.36748 17.0788 6.69451 17.2143 7.0355 17.2143C7.37649 17.2143 7.70352 17.0788 7.94464 16.8377C8.18576 16.5966 8.32122 16.2696 8.32122 15.9286C8.32122 15.5876 8.18576 15.2606 7.94464 15.0194C7.70352 14.7783 7.37649 14.6429 7.0355 14.6429ZM4.46407 15.9286C4.46407 15.2466 4.73499 14.5925 5.21723 14.1103C5.69946 13.6281 6.35352 13.3571 7.0355 13.3571C7.71749 13.3571 8.37154 13.6281 8.85378 14.1103C9.33601 14.5925 9.60693 15.2466 9.60693 15.9286C9.60693 16.6106 9.33601 17.2646 8.85378 17.7468C8.37154 18.2291 7.71749 18.5 7.0355 18.5C6.35352 18.5 5.69946 18.2291 5.21723 17.7468C4.73499 17.2646 4.46407 16.6106 4.46407 15.9286ZM16.0355 14.6429C15.6945 14.6429 15.3675 14.7783 15.1263 15.0194C14.8852 15.2606 14.7498 15.5876 14.7498 15.9286C14.7498 16.2696 14.8852 16.5966 15.1263 16.8377C15.3675 17.0788 15.6945 17.2143 16.0355 17.2143C16.3765 17.2143 16.7035 17.0788 16.9446 16.8377C17.1857 16.5966 17.3212 16.2696 17.3212 15.9286C17.3212 15.5876 17.1857 15.2606 16.9446 15.0194C16.7035 14.7783 16.3765 14.6429 16.0355 14.6429ZM13.464 15.9286C13.464 15.2466 13.735 14.5925 14.2172 14.1103C14.6994 13.6281 15.3535 13.3571 16.0355 13.3571C16.7175 13.3571 17.3715 13.6281 17.8537 14.1103C18.336 14.5925 18.6069 15.2466 18.6069 15.9286C18.6069 16.6106 18.336 17.2646 17.8537 17.7468C17.3715 18.2291 16.7175 18.5 16.0355 18.5C15.3535 18.5 14.6994 18.2291 14.2172 17.7468C13.735 17.2646 13.464 16.6106 13.464 15.9286Z"
                fill="#98A2A5"
              />
            </svg>
          </a>
          <a href="/" className={`cursor-pointer `}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.5 18C16.5 18 18 18 18 16.5C18 15 16.5 10.5 9 10.5C1.5 10.5 0 15 0 16.5C0 18 1.5 18 1.5 18H16.5ZM1.5075 16.584V16.581V16.584ZM1.533 16.5H16.467C16.474 16.4992 16.481 16.4982 16.488 16.497L16.5 16.494C16.4985 16.125 16.269 15.015 15.252 13.998C14.274 13.02 12.4335 12 9 12C5.565 12 3.726 13.02 2.748 13.998C1.731 15.015 1.503 16.125 1.5 16.494C1.51098 16.4961 1.52198 16.4981 1.533 16.5ZM16.494 16.584V16.581V16.584ZM9 7.5C9.79565 7.5 10.5587 7.18393 11.1213 6.62132C11.6839 6.05871 12 5.29565 12 4.5C12 3.70435 11.6839 2.94129 11.1213 2.37868C10.5587 1.81607 9.79565 1.5 9 1.5C8.20435 1.5 7.44129 1.81607 6.87868 2.37868C6.31607 2.94129 6 3.70435 6 4.5C6 5.29565 6.31607 6.05871 6.87868 6.62132C7.44129 7.18393 8.20435 7.5 9 7.5ZM13.5 4.5C13.5 5.69347 13.0259 6.83807 12.182 7.68198C11.3381 8.52589 10.1935 9 9 9C7.80653 9 6.66193 8.52589 5.81802 7.68198C4.97411 6.83807 4.5 5.69347 4.5 4.5C4.5 3.30653 4.97411 2.16193 5.81802 1.31802C6.66193 0.474106 7.80653 0 9 0C10.1935 0 11.3381 0.474106 12.182 1.31802C13.0259 2.16193 13.5 3.30653 13.5 4.5Z"
                fill="#98A2A5"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Catalog;
