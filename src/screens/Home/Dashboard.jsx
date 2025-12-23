import React, { useContext } from "react";
import styled from "styled-components";
import { IoTrashOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { FcOpenedFolder } from "react-icons/fc";
import logo from "../../assets/logo-small.png";
import { ModalContext } from "../../context/ModalContext";
import { PlaygroundContext } from "../../context/PlaygroundContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;

  span {
    color: #60a5fa;
  }
`;

const SecondaryBtn = styled.button`
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #e5e7eb;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const Folder = styled.div`
  margin-bottom: 2.5rem;
`;

const FolderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const FolderTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

const FolderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #94a3b8;

  svg {
    cursor: pointer;
    transition: color 0.2s ease;
  }

  svg:hover {
    color: #e5e7eb;
  }
`;

const FolderPrimaryBtn = styled.button`
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #e5e7eb;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  }
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CardText = styled.div`
  p {
    font-weight: 500;
    margin-bottom: 0.2rem;
  }

  small {
    color: #94a3b8;
    font-size: 0.85rem;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  color: #94a3b8;

  svg {
    cursor: pointer;
  }

  svg:hover {
    color: #e5e7eb;
  }
`;

const Logo = styled.img`
  width: 42px;
  margin-right: 0.75rem;
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const { openModal } = useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } =
    useContext(PlaygroundContext);

  return (
    <Container>
      <Header>
        <Title>
          My <span>Projects</span>
        </Title>

        <SecondaryBtn
          onClick={() =>
            openModal({
              show: true,
              modalType: 1, // NEW FOLDER
              identifiers: {
                folderId: "",
                cardId: "",
              },
            })
          }
        >
          + New Folder
        </SecondaryBtn>
      </Header>

      {Object.entries(folders).map(([folderId, folder]) => (
        <Folder key={folderId}>
          <FolderHeader>
            <FolderTitle>
              <FcOpenedFolder /> {folder.title}
            </FolderTitle>

            <FolderActions>
              <FolderPrimaryBtn
                onClick={() =>
                  openModal({
                    show: true,
                    modalType: 2, // NEW PLAYGROUND
                    identifiers: {
                      folderId,
                      cardId: "",
                    },
                  })
                }
              >
                + Playground
              </FolderPrimaryBtn>

              <IoTrashOutline onClick={() => deleteFolder(folderId)} />

              <BiEditAlt
                onClick={() =>
                  openModal({
                    show: true,
                    modalType: 4, // EDIT FOLDER
                    identifiers: {
                      folderId,
                      cardId: "",
                    },
                  })
                }
              />
            </FolderActions>
          </FolderHeader>

          <Grid>
            {Object.entries(folder.playgrounds).map(
              ([playgroundId, playground]) => (
                <Card
                  key={playgroundId}
                  onClick={() =>
                    navigate(`/playground/${folderId}/${playgroundId}`)
                  }
                >
                  <CardInfo>
                    <Logo src={logo} alt="Playground" />
                    <CardText>
                      <p>{playground.title}</p>
                      <small>{playground.language}</small>
                    </CardText>
                  </CardInfo>

                  <CardActions
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IoTrashOutline
                      onClick={() =>
                        deleteCard(folderId, playgroundId)
                      }
                    />
                    <BiEditAlt
                      onClick={() =>
                        openModal({
                          show: true,
                          modalType: 5, // EDIT PLAYGROUND
                          identifiers: {
                            folderId,
                            cardId: playgroundId,
                          },
                        })
                      }
                    />
                  </CardActions>
                </Card>
              )
            )}
          </Grid>
        </Folder>
      ))}
    </Container>
  );
};

export default Dashboard;
