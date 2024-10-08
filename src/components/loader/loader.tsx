import { ColorRing } from 'react-loader-spinner';

export const Loader = () => (
  <div className="flex justify-center items-center">
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={['#F6B83D', '#FFF4DF', '#FBE7C1', '#F6B83D', '#FFF4DF']}
    />
  </div>
);
