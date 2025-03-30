import { Button } from '@components/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@components/Drawer';
import { OriginInput } from '@components/Input';

export default function HomePage() {
  return (
    <div className="p-4">
      <CreateFolderButton />
    </div>
  );
}

const CreateFolderButton = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>폴더 생성</DrawerTitle>
          <DrawerDescription>nest-link를 한곳에 모아서 볼 수 있어요!</DrawerDescription>
        </DrawerHeader>

        <div className="flex justify-center">
          <div className="w-full max-w-[500px] p-4">
            <OriginInput className="" />
          </div>
        </div>

        <div className="flex justify-center">
          <DrawerFooter className="w-full max-w-[500px]">
            <DrawerClose asChild>
              <Button variant="outline">닫기</Button>
            </DrawerClose>
            <Button>저장</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
