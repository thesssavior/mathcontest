import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import styled from 'styled-components';

const Wrapper = styled.div`
    text-align: center;
    height: 100%;
`

const List: React.FC = () => {
  const { folderName } = useParams();
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const storage = getStorage();
        const folderRef = ref(storage, folderName || '');

        const fileList = await listAll(folderRef);
        const downloadURLs = await Promise.all(
          fileList.items.map(async (item) => getDownloadURL(item))
        );

        setFiles(downloadURLs);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [folderName]);

  return (
    <Wrapper>
      <h1>{folderName}</h1>
      <ul>
        {files.map((url, index) => (
          <li key={index}>
            <Link to={`/problem/${folderName}/${index+1}`}>
                <img src={url} alt='a'/>
                Problem {index + 1}
            </Link>
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default List;
