import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ASYNC_STORAGE_KEY } from 'constant/AsyncStorage';
import { setCurrentSpace, setMySpaces } from 'store/slices/space';
import { useLazyGetMySpacesQuery } from 'store/services/space';
import { Space } from 'types';

/**
 * 0 : no error
 * 1 : request error
 * 2 : no my spaces
 */
type ErrorCode = 0 | 1 | 2;

const useGetCurrentSpace = () => {
  const dispatch = useDispatch();
  const [currentSpace, setSpace] = useState<Space | null>(null);
  const [errorCode, setErrorCode] = useState<ErrorCode>(0);
  const [trigger, { data, isSuccess, isError: queryError }] = useLazyGetMySpacesQuery();

  useEffect(() => {
    if (queryError) {
      setErrorCode(1);
    }
  }, [queryError]);

  useEffect(() => {
    if (currentSpace) {
      dispatch(setCurrentSpace(currentSpace));
      (async function () {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEY.SPACE_ID, currentSpace.spaceId.toString());
      })();
    }
  }, [currentSpace]);

  useEffect(() => {
    if (isSuccess && data) {
      if (data.spaces.length === 0) {
        setErrorCode(2);
      } else {
        (async function () {
          const spaceId = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.SPACE_ID);
          const mySpace = spaceId
            ? data.spaces.find((space) => space.spaceId === +spaceId)
            : undefined;
          setSpace(mySpace || data.spaces[0]);
          dispatch(setMySpaces(data.spaces));
        })();
      }
    }
  }, [isSuccess, data]);

  return { isSuccess, errorCode, trigger, currentSpace };
};

export default useGetCurrentSpace;
