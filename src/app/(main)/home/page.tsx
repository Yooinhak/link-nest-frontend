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
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
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

        <DrawerClose>
          <div>닫기</div>
        </DrawerClose>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
