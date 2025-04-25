import BarTools from "@/components/BarTools";
import React, { type ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
	return (
		<div className="w-full h-full md:py-6 grid grid-rows-[6rem_1fr] md:grid-rows-[6rem_1fr]">
			<div className="flex items-center px-7 md:px-14">
				<BarTools type="image" title="Images" />
			</div>

			{children}
		</div>
	);
}

export default layout;
