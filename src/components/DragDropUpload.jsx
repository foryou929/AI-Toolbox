import { Flex, Image, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';

const DragDropUpload = ({ accept, onAccept }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        onDrop: (acceptedFiles) => {
            onAccept(acceptedFiles[0]);
        },
    });

    return (
        <Flex
            {...getRootProps()}
            w='100%' h='100%' p={4}
            direction='column' justify='center' align='center' cursor='pointer'
        >
            <input {...getInputProps()} />
            <Image w={16} h={14} src='images/upload.png' />
            {isDragActive ? (
                <Text fontWeight='bold'>Drop the files here ...</Text>
            ) : (
                <Text fontWeight='bold'>Drag and drop a file or click to upload</Text>
            )}
        </Flex>
    );
};

export default DragDropUpload;