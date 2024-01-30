export interface IBaseUseCase<P, R> {
	execute(param: P): Promise<R>;
}
