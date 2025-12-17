import { Box, Chip, Stack } from "@mui/material";

export default function Subjects( { subjects, handleSubjectClick } ) {

    return (
        <Stack 
            direction="row"
            sx={{ 
                margin: '10px',
                flexWrap: 'wrap', 
                justifyContent: 'center' 
            }}
        >
            {subjects.map((subject, idx) => (
                <Chip
                    key={idx}
                    label={subject.label}
                    onClick={() => handleSubjectClick(subject.value)}
                    className="subjectChip"
                />
            ))}
        </Stack>
    );
}